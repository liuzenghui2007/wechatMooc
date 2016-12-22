'use strict';

var path = require('path');
var config = require('../config');
var Wechat = require('../wechat/wechat');
var menu = require('./menu');
var wechatApi = new Wechat(config.wechat);


exports.reply = function* (next) {
  wechatApi.getMneu()
  .then(function(res) {
    if (JSON.stringify(menu) != JSON.stringify(res.menu)) {
      wechatApi.deleteMenu()
      .then(function() {
        return wechatApi.createMenu(menu)
      })
      .then(function(res) {
        console.log(res)
      })
    }
  })
  var message = this.wexin;
  if (message.MsgType == 'event') {
    switch (message.Event) {
      case 'subscribe':
        if (message.EventKey) {
          console.log('扫二维码进来：' + message.EventKey + ' ' + message.ticket)
        }
        this.body = '哈哈，你订阅了这个号诶\r\n';
        break;
      case 'unsubscribe':
        console.log('无情取关');
        this.body = '';
        break;
      case 'LOCATION':
        this.body = '您上报的位置是： ' + message.Latitude + '/' + message.Longitude + '-' + message.Precision;
        break;
      case 'CLICK':
        this.body = '您点击了菜单：' + message.EventKey;
        break;
      case 'SCAN':
        console.log('关注后扫二维码' + message.EventKey + ' ' + message.Ticket);
        this.body = '看到你扫了一下喔~';
        break;
      case 'VIEW':
        this.body = '您点击了菜单中的链接：' + message.EventKey;
        break;
      case 'scancode_push':
        console.log('ScanCodeInfo--->', message.ScanCodeInfo.ScanType);
        console.log('ScanResult--->', message.ScanCodeInfo.ScanResult);
        this.body = '您点击了菜单中的链接：' + message.EventKey;
        break;
      case 'scancode_waitmsg':
        console.log('ScanCodeInfo--->', message.ScanCodeInfo.ScanType);
        console.log('ScanResult--->', message.ScanCodeInfo.ScanResult);
        this.body = '您点击了菜单中的链接：' + message.EventKey;
        break;
      case 'pic_sysphoto':
        console.log('picList--->', message.SendPicsInfo.PicList);
        console.log('picCount--->', message.SendPicsInfo.Count);
        this.body = '您点击了菜单中的链接：' + message.EventKey;
        break;
      case 'pic_photo_or_album':
        console.log('picList--->', message.SendPicsInfo.PicList);
        console.log('picCount--->', message.SendPicsInfo.Count);
        this.body = '您点击了菜单中的链接：' + message.EventKey;
        break;
      case 'pic_weixin':
        console.log('picList--->', message.SendPicsInfo.PicList);
        console.log('picCount--->', message.SendPicsInfo.Count);
        this.body = '您点击了菜单中的链接：' + message.EventKey;
        break;
      case 'location_select':
        console.log('Location_X--->', message.SendLocationInfo.Location_X);
        console.log('Location_Y--->', message.SendLocationInfo.Location_Y);
        console.log('Scale--->', message.SendLocationInfo.Scale);
        console.log('Label--->', message.SendLocationInfo.Label);
        console.log('Poiname--->', message.SendLocationInfo.Poiname);
        this.body = '您点击了菜单中的链接：' + message.EventKey;
        break;
      default:
        this.body = '哇！你这个举动触发了一个事件诶...';
        console.log('触发了一个事件哦')
        break;
    }

  } else if (message.MsgType == 'text') {
    var content = message.Content;

    switch (content) {
      case '1':
        var reply = '天下第一吃大米';
        break;

      case '2':
        var reply = '天下第二吃豆腐';
        break;

      case '3':
        var reply = '天下第三吃仙丹';
        break;

      case '4':
        var reply = [
          {
            title: '技术改变世界',
            description: '只是个描述而已',
            picUrl: 'http://d.hiphotos.baidu.com/zhidao/pic/item/faf2b2119313b07e494086920cd7912396dd8caf.jpg',
            url: 'http://github.com'
          },
          {
            title: 'Nodejs 开发微信',
            description: '爽到爆',
            picUrl: 'http://imgsrc.baidu.com/forum/pic/item/d833c895d143ad4b3ab4727a82025aafa50f06f5.jpg',
            url: 'http://www.baidu.com'
          }
        ];
        break;

      case '5':
        var data = yield wechatApi.uploadMaterial('image', path.join(__dirname, '../2.jpg'));
        var reply = {
          type: 'image',
          media_id: data.media_id
        }
        break;

      case '6':
        var data = yield wechatApi.uploadMaterial('voice', path.join(__dirname, '../4.mp3'));
        var reply = {
          type: 'voice',
          media_id: data.media_id
        }
        break;

      case '7':
        var data = yield wechatApi.uploadMaterial('video', path.join(__dirname, '../2.mp4'));
        var reply = {
          type: 'video',
          media_id: data.media_id,
          title: '捉妖记',
          description: '我只是个描述而已'
        }
        break;

      case '8':
        var data = yield wechatApi.uploadMaterial('image', path.join(__dirname, '../2.jpg'));
        var reply = {
          type: 'music',
          title: '音乐内容',
          description: '放松一下',
          musicUrl: 'http://sc1.111ttt.com:8282/2016/1/06/25/199251943186.mp3?tflag=1481333317&pin=eb1c983f688cda34de7a8d6b0d51a321',
          thumbMediaId: data.media_id
        }
        break;

      case '9':
        var data = yield wechatApi.uploadMaterial('image', path.join(__dirname, '../2.jpg'), {type: 'image'});
        var reply = {
          type: 'image',
          media_id: data.media_id
        }
        break;

      case '10':
        var data = yield wechatApi.uploadMaterial('video', path.join(__dirname, '../2.mp4'), {type: 'video', description: '{"title": "Really a nice place", "introduction": "Never think it is so easy"}'});

        var reply = {
          type: 'video',
          media_id: data.media_id,
          title: '捉妖记',
          description: '我只是个描述而已'
        }
        break;

      case '11':
        var picData = yield wechatApi.uploadMaterial('image', path.join(__dirname, '../2.jpg'), {});
        var media = {
          articles: [
            {
              title: 'tututu2',
              thumb_media_id: picData.media_id,
              author: 'Jason Wang',
              digest: '没有摘要',
              show_cover_pic: 1,
              content: '没有内容',
              content_source_url: 'http://www.baidu.com'
            },
            {
              title: 'tututu3',
              thumb_media_id: picData.media_id,
              author: 'Jason Wang',
              digest: '没有摘要',
              show_cover_pic: 1,
              content: '没有内容',
              content_source_url: 'http://www.baidu.com'
            },
            {
              title: 'tututu4',
              thumb_media_id: picData.media_id,
              author: 'Jason Wang',
              digest: '没有摘要',
              show_cover_pic: 1,
              content: '没有内容',
              content_source_url: 'http://www.baidu.com'
            }
          ]
        }

        var data = yield wechatApi.uploadMaterial('news', media, {})
        data = yield wechatApi.fetchMaterial(data.media_id, 'news', {});

        var items = data.news_item;

        var news = [];
        items.forEach(function(item) {
          news.push({
            title: item.title,
            description: item.digest,
            picUrl: picData.url,
            url: item.url
          })
        })

        var reply = news;
        break;

      case '12':
        var counts = yield wechatApi.countMaterial();
        console.log(JSON.stringify(counts));

        var results = yield [
          wechatApi.batchMaterial({
            type: 'image',
            offset: 0,
            count: 10
          }),
          wechatApi.batchMaterial({
            type: 'video',
            offset: 0,
            count: 10
          }),
          wechatApi.batchMaterial({
            type: 'voice',
            offset: 0,
            count: 10
          }),
          wechatApi.batchMaterial({
            type: 'news',
            offset: 0,
            count: 10
          })
        ];  

        console.log(JSON.stringify(results));

        reply = '1';

        break;

      case '13':
        // var group = yield wechatApi.createGroup('wechat');
        // console.log('新分组 wechat', group);

        // var groups = yield wechatApi.fetchGroups();

        // console.log('加了 wechat 后的分组列表：', groups);

        var group2 = yield wechatApi.checkGroup(message.FromUserName);
        console.log('查看自己的分组', group2);

        var result3 = yield wechatApi.MoveGroup(message.FromUserName, 105)
        console.log('移动到105分组', result3);

        var groups11 = yield wechatApi.fetchGroups();
        console.log('移动后的分组列表：', groups11);

        var result4 = yield wechatApi.MoveGroup([message.FromUserName], 100)
        console.log('移动到100分组', result4);

        var groups111 = yield wechatApi.fetchGroups();
        console.log('移动到100分组后的分组列表：', groups111);

        var result5 = yield wechatApi.updateGroup(102, 'changeName');
        console.log('把id为102的分组改名了', result5);
        var groups2 = yield wechatApi.fetchGroups();
        console.log('改名102分组后的分组列表：', groups2);

        var result1 = yield wechatApi.deleteGroup(103);
        console.log('删除103分组', result1);
        var groups3 = yield wechatApi.fetchGroups();
        console.log('删除103分组后的分组列表：', groups3);




        var reply = 'Group done!';
        break;

      case '14':
        var user = yield wechatApi.fetchUsers(message.FromUserName, 'en');
        console.log('单个获取用户信息--->', user);

        var openIds = [
          {
            openid: message.FromUserName,
            lang: 'en'
          }
        ];
        var user1 = yield wechatApi.fetchUsers(openIds);
        console.log('批量获取用户信息--->', user1);

        var reply = JSON.stringify(user);
        break;

      case '15':
        var userList = yield wechatApi.listUsers();
        console.log('获取用户列表', userList);

        var reply = userList.total;
        break;

      case '16':
        var mpnews = {
          media_id: 'FyIxUUsMKFMTYnwqTZ_Dcgt6YK2VU2JLCgXAezKSnN0'
        }
        var text = {
          content: 'hahahahah'
        };
        var msgData = yield wechatApi.sendByGroup('text', text, 100);
        console.log('msgData----->', msgData);
        var reply = 'Yeah!!';
        break;

      case '17':
        var mpnews = {
          media_id: 'FyIxUUsMKFMTYnwqTZ_Dcgt6YK2VU2JLCgXAezKSnN0'
        };
        var msgData = yield wechatApi.previewMass('mpnews', mpnews, message.FromUserName)
        var reply = 'hello wechat!';
        break;

      case '18':
        var msgData = yield wechatApi.checkMass(1000000008);
        console.log(msgData);
        var reply = 'Yeah!';
        break;

      case '19':
        var temQr = {
          "expire_seconds": 604800, 
          "action_name": "QR_SCENE", 
          "action_info": {
            "scene": {
              "scene_id": 123
            }
          }
        };
        var premQr = {
          "action_name": "QR_LIMIT_SCENE", 
          "action_info": {
            "scene": {
              "scene_id": 123
            }
          }
        };
        var premStrQr = {
          "action_name": "QR_LIMIT_STR_SCENE", 
          "action_info": {
            "scene": {
              "scene_str": 123
            }
          }
        };
        var msgData = yield wechatApi.createQrCode(temQr);
        console.log('temQr--->', msgData);
        // var msgData1 = yield wechatApi.createQrCode(premQr);
        // console.log('premQr--->', msgData1);
        // var msgData2 = yield wechatApi.createQrCode(premStrQr);
        // console.log('premStrQr--->', msgData2);
        // var reply = wechatApi.showQrCode(msgData.ticket)
        break;

      case '20':
        var longUrl = 'http://wap.koudaitong.com/v2/showcase/goods?alias=128wi9shh&spm=h56083&redirect_count=1';
        var shortData = yield wechatApi.createShortUrl(null, longUrl);
        var reply = shortData.short_url;
        break;

      case '21':
        var semanticData = {
          query: '寻龙诀',
          city: '杭州',
          category:  'movie',
          uid: message.FromUserName
        } 
        var msgData = yield wechatApi.semantic(semanticData);
        console.log(msgData);
        var reply = JSON.stringify(msgData);
        break;

      case 'jssdk':
        var reply = 'https://wechatmooc.localtunnel.me/movie';
        break;
      default:
        var reply =  '额，你说的' + content + '太复杂了';
    }

    this.body = reply;
  }
  yield next
}