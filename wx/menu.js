'use strict';

module.exports = {
   "button":[
      {  
        "type": "click",
        "name": "点击事件",
        "key": "menu_click",
        "sub_button": []
      },
      {  
        "name": "点出菜单",
        "sub_button":[
          {  
            "type": "view",
            "name": "跳转URL",
            "url": "http://github.com/",
            "sub_button": []
          },
          {
            "type": "scancode_push",
            "name": "扫码推送事件事件事件事件",
            "key": "qr_scan",
            "sub_button": []
          },
          {
            "type": "scancode_waitmsg",
            "name": "扫码推送事件中...",
            "key": "qr_scan_wait",
            "sub_button": []
          },
          {
            "type": "pic_sysphoto",
            "name": "弹出系统拍照",
            "key": "pic_photo",
            "sub_button": []
          },
          {
            "type": "pic_photo_or_album",
            "name": "弹出拍照或相册",
            "key": "pic_photo_album",
            "sub_button": []
          },
        ]
      },
      {
        "name": "点出菜单2",
        "sub_button":[
          {  
            "type": "pic_weixin",
            "name": "微信相册发图",
            "key": "pic_weixin",
            "sub_button": []
          },
          {
            "type": "location_select",
            "name": "地理位置选择",
            "key": "location_select",
            "sub_button": []
          }
          // {
          //   "type": "media_id",
          //   "name": "下发图片消息",
          //   "key": "xxx"
          // },
          // {
          //   "type": "view_limited",
          //   "name": "跳转图文消息URL",
          //   "key": "xxx"
          // }
        ]
      }
    ]
}