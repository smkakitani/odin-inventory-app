const links = [
  { href: "/", title: "Home" },
  { href: "games", title: "Games" },
  { href: "list", title: "List" },
];


// 
exports.indexHomeGet = (req, res) => {
  res.render("index", {
    links: links,
  });
};