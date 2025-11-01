const links = [
  { href: "/", title: "Home" },
  { href: "games", title: "Games" },
  { href: "list", title: "List" },
];


// 
const indexHomeGet = (req, res) => {
  res.render("index", {
    links: links,
  });
};



module.exports = {
  links,
  indexHomeGet,
};