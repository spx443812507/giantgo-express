module.exports = {
  /**
   * Before connection (optional, just for faye)
   * @param {client} client connection
   */
  beforeConnect: function (client) {
    // Example:
    // client.setHeader('Authorization', 'OAuth abcd-1234');
    // client.disable('websocket');
  },

  /**
   * On client connection (required)
   * @param {client} client connection
   * @param {done} callback function(err) {}
   */
  onConnect: function (client, done) {
    // Faye client
    // client.subscribe('/channel', function(message) { });

    // Socket.io client
    client.emit('emitSocket', {
      'size': 0,
      'orn': '02-0001-00000001',
      'dst': '01-0100-00000001',
      'type': '0x0002',
      'cmd': 'onPublishQuestionnaire',
      'sess': '387b2215a7aae28c40aae805861e6af3',
      'seq': 0,
      'ver': 1000,
      'body': {
        'head': {
          'webinarId': '3514',
          'tenantId': '487',
          'role': 2,
          'userid': 649,
          'email': '15141616161@qq.com',
          'username': '王建坤1',
          'clientType': 'pc'
        }, 'data': {'id': '3560', 'subject': '11', '$$hashKey': 'object:6', 'state': 'published'}, 'webcastId': ''
      }
    })

    // Primus client
    // client.write('Sailing the seas of cheese');

    // WAMP session
    // client.subscribe('com.myapp.hello').then(function(args) { });

    done()
  },

  /**
   * Send a message (required)
   * @param {client} client connection
   * @param {done} callback function(err) {}
   */
  sendMessage: function (client, done) {
    // Example:
    client.emit('emitSocket', {
      'size': 0,
      'orn': '02-0001-00000001',
      'dst': '01-0100-00000001',
      'type': '0x0002',
      'cmd': 'onPublishQuestionnaire',
      'sess': '387b2215a7aae28c40aae805861e6af3',
      'seq': 0,
      'ver': 1000,
      'body': {
        'head': {
          'webinarId': '3514',
          'tenantId': '487',
          'role': 2,
          'userid': 649,
          'email': '15141616161@qq.com',
          'username': '王建坤1',
          'clientType': 'pc'
        }, 'data': {'id': '3560', 'subject': '11', '$$hashKey': 'object:6', 'state': 'published'}, 'webcastId': ''
      }
    })
    // client.publish('/test', { hello: 'world' });
    // client.call('com.myapp.add2', [2, 3]).then(function (res) { });
    done()
  },

  /**
   * WAMP connection options
   */
  options: {
    // realm: 'chat'
  }
}
