export default {
  pages: ["pages/index/index", "pages/my/index"],
  tabBar: {
    selectedColor: "#1677ff",
    list: [
      {
        iconPath: "assets/information_add.png",
        selectedIconPath: "assets/information_add_1.png",
        pagePath: "pages/index/index",
        text: "้ฆ้กต",
      },
      {
        iconPath: "assets/address_book.png",
        selectedIconPath: "assets/address_book_1.png",
        pagePath: "pages/my/index",
        text: "ๆ็",
      },
    ],
  },
  window: {
    backgroundTextStyle: "light",
    navigationBarBackgroundColor: "#fff",
    navigationBarTitleText: "WeChat",
    navigationBarTextStyle: "black",
  },
};
