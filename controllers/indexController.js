const links = [
  { href: "/", title: "Home" },
  { href: "games", title: "Games" },
  { href: "lists", title: "Lists" },
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