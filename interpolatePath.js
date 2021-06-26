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

export default function interpolatePath(pathSource, pathDestination) {
  'worklet';

  const commandsSource = pathCommandsFromString(pathSource);
  const commandsDestination = pathCommandsFromString(pathDestination);

  if (commandsSource.length !== commandsDestination?.length) {
    // TODO: Make command array the same length
    return () => {
      'worklet';
      return '';
    };
  }

  const interpolator = [];
  for (let i = 0; i < commandsSource.length; i++) {
    interpolator.push({
      type: commandsSource[i].type,
      x: commandsSource[i].x,
      y: commandsSource[i].y,
      dx: commandsDestination[i].x - commandsSource[i].x,
      dy: commandsDestination[i].y - commandsSource[i].y,
    });
  }

  // Progres: 0 - 1
  return (progress) => {
    'worklet';

    const output = [];

    for (let i = 0; i < interpolator.length; i++) {
      const command = interpolator[i].type;
      const x = interpolator[i].x + progress * interpolator[i].dx;
      const y = interpolator[i].y + progress * interpolator[i].dy;
      output.push(`${command}${x},${y}`);
    }

    return output.join('');
  };
}
