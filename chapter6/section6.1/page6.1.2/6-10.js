
var Redis = require('redis');

var client = redis.createClient();

client.on('error', function (err) {
    console.log('Error: ' + err);
});


// 2.Redis里基础的get和set操作
console.log('Setting key1');
client.set('key1', 'My string!', redis.print);
console.log('Getting key1');
client.get('key1', function (err, reply) {
    console.log('Results for key1:' + reply);
    // client.end();
});


// 3.1每次设置一个hash值(hmset)
console.log('Setting user hash');
client.hset('user', 'username', 'johndoe');
client.hset('user', 'firstname', 'john');
client.hset('user', 'lastname', 'doe');

client.hkeys('user', function(err, replies) {
    console.log('Result for user:');
    console.log(replies.length + ' replies:');
    replies.forEach(function (reply, i) {
        console.log(i + ': ' + reply);
    });
    // client.end();
});

// 3.2一次设置多个值(hmset)
console.log('Setting user hash');
client.hmset('user', 'username', 'johndoe', 'firstname', 'john', 
    'lastname', 'doe');

// 3.3使用对象来完成一次性设置，而不是key，value
var user = {
    username: 'johndoe',
    firstname: 'john',
    lastname: 'doe'
};
client.hmset('user', user);


// 4.在Redis中使用列表
// 使用lpush和rpop实现了一个先入先出队列（FIFO）
client.lpush('pendingusers', 'user1');
client.lpush('pendingusers', 'user2');
client.lpush('pendingusers', 'user3');
client.lpush('pendingusers', 'user4');

client.rpop('pendingusers', function (err, username) {
    if (!err) {
        console.log('Processing ' + username);
    }
    // client.end();
});

// 5.使用Redis集合命令（当需要一个没有重复内容的列表时，使用集合）
// sadd、smembers
client.sadd("myteam", 'Neil');
client.sadd("myteam", 'Peter');
client.sadd("myteam", 'Brian');
client.sadd("myteam", 'Scott');
client.sadd("myteam", 'Brian');

client.smembers("myteam", function (err, members) {
    console.log(members);
    // client.end();
});

// 使用Redis来进行列表排序(zadd, zcard, zrange)
// 有序集合增加了权重的概念,允许进行基于分数的操作，如排行榜、最高分、内容表
client.zadd('contestants', 60, 'Deborah');
client.zadd('contestants', 65, 'John');
client.zadd('contestants', 26, 'Patrick');
client.zadd('contestants', 62, 'Mike');
client.zadd('contestants', 24, 'Courtney');
client.zadd('contestants', 39, 'Jennifer');
client.zadd('contestants', 26, 'Jessica');
client.zadd('contestants', 46, 'Joe');
client.zadd('contestants', 63, 'Bonnie');
client.zadd('contestants', 27, 'Vinny');
client.zadd('contestants', 27, 'Ramon');
client.zadd('contestants', 51, 'Becky');
client.zadd('contestants', 41, 'Sunny');
client.zadd('contestants', 47, 'Antone');
client.zadd('contestants', 40, 'John');

client.zcard('contestants', function (err, length) {
    if (!err) {
        var contestantCount = length;
        var membersPerTeam = Match.ceil(contestantCount / 3);
        client.zrange('contestants', membersPerTeam * 0, membersPerTeam * 1 - 1,
          function (err, values) {
            console.log('Young team: ' + values);
          });
        client.zrange('contestants', membersPerTeam * 1, membersPerTeam * 2 - 1,
          function (err, values) {
            console.log('Middle team: ' + values);
          });
        client.zrange('contestants', membersPerTeam * 2, contestantCount,
          function (err, values) {
            console.log('Elder team: ' + values);
            // client.end();
          });
    }
});
