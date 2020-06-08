let myUser = null
export const UserService = {
  userColorMap: {},
  setUser: (user) => {
    myUser = user;
  },
  getUser: () => {
    return myUser;
  },
  getUserColor: function (str) {
    if (this.userColorMap[str]) return this.userColorMap[str];
    this.userColorMap[str] = getHexColor(str);
    return this.userColorMap[str];
  }
}

function getHexColor(str) {
  var hash = 0;
  for (var i = 0; i < str.length; i++) {
    hash = str.charCodeAt(i) + ((hash << 5) - hash);
  }
  var c = (hash & 0x00FFFFFF)
    .toString(16)
    .toUpperCase();
  let colorHex = '#' + "00000".substring(0, 6 - c.length) + c;
  return colorHex;
}


