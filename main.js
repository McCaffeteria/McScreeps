var roleCollector = require('role.collector');

module.exports.loop = function () {
    console.log('Start Tick');
    
    console.log('Clearing unused memory');
    for(var i in Memory.creeps) {
        if(!Game.creeps[i]) {
            delete Memory.creeps[i];
        }
    }
    
    var targetPop = 3
    var roomPop = 0;
    
    for (var roomName in Game.rooms) {
        var room = Game.rooms[roomName];
        
        console.log('Energy available in ' + room + ' = ' + room.energyAvailable);
        
        var creepsInRoom = _.filter(Game.creeps, function(o) { return o.room == room; });
        
        if (room.energyAvailable >= 200) {
            for (var name in creepsInRoom) {
                var creep = creepsInRoom[name];
                console.log('Creep ' + name + ' reporting in.');
                roomPop++
            }
            
            console.log(room + ' population = ' + roomPop);
            
            if (roomPop < targetPop) {
                var creepNameIndex = 0;
                var cniUsed = true;
                
                console.log('Finding unused creep name index...');
                
                while (cniUsed == true) {
                    if (!Game.creeps['creep' + creepNameIndex]) {
                        cniUsed = false;
                        console.log(room + ' spawning new creep with index ' + creepNameIndex);
                        room.find(FIND_MY_SPAWNS)[0].spawnCreep([WORK, CARRY, MOVE, MOVE], 'creep' + creepNameIndex, { memory: {role: 'collector', cni: creepNameIndex, full: false} });
                    }
                    else {
                        creepNameIndex++
                    }
                }
            }
            else {
                console.log(room + ' has at least ' + targetPop + ' creeps.');
            }
        }
        else {
            console.log(room + ' does not have enough energy.');
        }
        
        console.log('Asigning creeps ' + creepsInRoom + ' in ' + room);
        
        for (var creepName in creepsInRoom) {
            var creep = creepsInRoom[creepName];
            console.log('Asigning ' + creep);
            if (creep.memory.role == 'collector') {
                roleCollector.run(creep);
            }
        }
    }
    console.log('Ending tick.');
    console.log();
}