var roleCollector = {
    run: function(creep) {
        console.log(creep + ' is starting collection role.');
        
        if (creep.store.getFreeCapacity() == 0) {
            creep.memory.full = true;
        }
        else if (creep.store.getUsedCapacity() == 0) {
            creep.memory.full = false;
        }
        
        if (creep.memory.full == false) {
            var sources = creep.pos.findClosestByPath(creep.room.find(FIND_SOURCES_ACTIVE));
            if (creep.harvest(sources) == ERR_NOT_IN_RANGE) {
                console.log(creep + ' moving to collect nearest energy.');
                creep.moveTo(sources);
            }
        }
        else if (Game.spawns['Spawn1'].energy < Game.spawns['Spawn1'].energyCapacity) {
            if (creep.transfer(Game.spawns['Spawn1'], RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                console.log(creep + ' moving to charge ' + Game.spawns['Spawn1']);
                creep.moveTo(Game.spawns['Spawn1']);
            }
        }
        else {
            if (creep.upgradeController(creep.room.controller) == ERR_NOT_IN_RANGE) {
                console.log(creep + ' moving to upgrade ' + creep.room + ' controller.');
                creep.moveTo(creep.room.controller);
            }
        }
    }
};

module.exports = roleCollector;