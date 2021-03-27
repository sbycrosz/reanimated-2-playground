import _ from 'lodash';

const commandTokenRegex = /[MLCSTQAHVZmlcstqahv]|-?[\d.e+-]+/g;

var typeMap = {
  M: ['x', 'y'],
  L: ['x', 'y'],
  H: ['x'],
  V: ['y'],
  C: ['x1', 'y1', 'x2', 'y2', 'x', 'y'],
  S: ['x2', 'y2', 'x', 'y'],
  Q: ['x1', 'y1', 'x', 'y'],
  T: ['x', 'y'],
  A: ['rx', 'ry', 'xAxisRotation', 'largeArcFlag', 'sweepFlag', 'x', 'y'],
  Z: [],
}; // Add lower case entries too matching uppercase (e.g. 'm' == 'M')

function pathCommandsFromString(d) {
  'worklet';

  // split into valid tokens
  var tokens = (d || '').match(commandTokenRegex) || [];
  var commands = [];
  var commandArgs;
  var command; // iterate over each token, checking if we are at a new command
  // by presence in the typeMap

  for (let i = 0; i < tokens.length; ++i) {
    commandArgs = typeMap[tokens[i]]; // new command found:

    if (commandArgs) {
      command = {
        type: tokens[i],
      }; // add each of the expected args for this command:

      for (let a = 0; a < commandArgs.length; ++a) {
        command[commandArgs[a]] = +tokens[i + a + 1];
      } // need to increment our token index appropriately since
      // we consumed token args

      i += commandArgs.length;
      commands.push(command);
    }
  }

  return commands;
}

export default function interpolatePath(path1, path2) {
  'worklet';

  const commands1 = pathCommandsFromString(path1);
  const commands2 = pathCommandsFromString(path2);

  if (commands1.length !== commands2?.length) {
    // TODO:
    return () => {
      'worklet';
      return '';
    };
  }

  const foobar = [];
  for (let i = 0; i < commands1.length; i++) {
    foobar.push({
      type: commands1[i].type,
      x: commands1[i].x,
      y: commands1[i].y,
      dx: commands2[i].x - commands1[i].x,
      dy: commands2[i].y - commands1[i].y,
    });
  }

  // 0 - 1
  return (t) => {
    'worklet';

    // return `M0,300 L100,${150 - 50 * t} L200,${100 + 100 * t} L300,${
    //   200 - 100 * t
    // } L400,${240 - 100 * t}L400,300Z`;

    const output = [];

    for (let i = 0; i < foobar.length; i++) {
      // output.push({
      //   type: foobar[i].type,
      //   x: foobar[i].x + t * foobar[i].dx,
      //   y: foobar[i].y + t * foobar[i].dy,
      // });
      output.push(
        `${foobar[i].type} ${foobar[i].x + t * foobar[i].dx} ${
          foobar[i].y + t * foobar[i].dy
        }`,
      );
    }

    return output.join('');
  };
}
