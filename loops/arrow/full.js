function capitalize(name) {
  return name[0].toUpperCase() + name.slice(1);
}

function applyCustomGreeting(name, callback) {
  return callback(capitalize(name));
}

console.log(applyCustomGreeting("mark", (name) => `안녕, ${name}!`));
