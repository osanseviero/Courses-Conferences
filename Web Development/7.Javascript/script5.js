var journal = [];

function addEntry(events, didTurnIntoLlama) {
    journal.push({
        events: events,
        llama: didTurnIntoLlama
    })
}

addEntry(['work', 'pizza', 'running', 'magic beans'], false);
addEntry(['work', 'hamburguer', 'eat grass', 'magic potatoes'], false);
addEntry(['weekend', 'mushrooms', 'pizza', 'running', 'Flash'], true);
console.log(journal);

function phi(table) {
  return (table[3] * table[0] - table[2] * table[1]) /
    Math.sqrt((table[2] + table[3]) *
              (table[0] + table[1]) *
              (table[1] + table[3]) *
              (table[0] + table[2]));
}

function hasEvent(event, entry) {
    return entry.events.indexOf(event) != -1;
}

function tableFor(event, journal) {
    var table = [0, 0, 0, 0];
    for(var i = 0; i < journal.length; i++) {
        var entry = journal[i];
        index = 0;
        if(hasEvent(event,entry)) {
            index += 1;
        }
        if(entry.llama) {
            index += 2;
        }
        table[index] += 1;
    }
    return table;
}

var map = {};
function storePhi(event, phi) {
    map[event] = phi;
}

function gatherCorrelations(journal) {
  var phis = {};
  for(var entry = 0; entry < journal.length; entry++) {
    var events = journal[entry].events;
    for(var i = 0; i < events.length; i++) {
        var event = events[i];
        if(!(event in phis)) {
            phis[event] = phi(tableFor(event, journal));
        }
    }
  } 
  return phis;
}

var correlations = gatherCorrelations(journal);
for (var event in correlations)
  console.log(event + ": " + correlations[event]);









