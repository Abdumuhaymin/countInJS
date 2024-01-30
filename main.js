let url = "https://jsonplaceholder.typicode.com/comments?_limit=100&_page=";
let dataList = document.querySelector(".content__list");
let pageBox = document.querySelector(".button__box");
let openS = document.querySelector(".open");
let storageList = document.querySelector(".storage__list");
let storage = document.querySelector(".storage");
let closeM = document.querySelector("#close");
let allProduct = document.querySelector(".total");

const getStData = () => {
  const res = JSON.parse(localStorage.getItem("product"));

  return res;
};

const renderStorage = () => {
  const data = getStData();
  if (data) {
    storageList.innerHTML = data
      .map(
        (item) =>
          `
            <li class="backet__item">
              <h2 class="backet__title">${item.name}</h2>
              <button data-id="${item.id}">delete</button>
            </li>
            `
      )
      .join("");
  }
};

const addData = (data) => {
  const oldData = getStData();
  if (oldData) {
    const existingData = oldData.findIndex((item) => item.id === data.id);
    if (existingData !== -1) {
      oldData[existingData] = data;
      localStorage.setItem("product", JSON.stringify(oldData));
    } else {
      localStorage.setItem("product", JSON.stringify([...oldData, data]));
    }
  } else {
    localStorage.setItem("product", JSON.stringify([data]));
  }
};
const totalCount = () => {
  allProduct.innerHTML = getStData().length;
};

const renData = (data) => {
  dataList.innerHTML = data
    .map(
      (item) => `
      <li>
      <h1>${item.id}</h1>
      <h2>Name:${item.name}</h2>
      <h2>Email:${item.email}</h2>
      <h2>Body:${item.body}</h2>
      <button data-id="${item.id}">save data</button>
      </li>
      `
    )
    .join("");
};

const getData = async (page) => {
  try {
    const res = await fetch(`${url}${page}`);
    const data = await res.json();
    console.log(data);
    renData(data);
  } catch (error) {}
};
getData(1);
pageBox.addEventListener("click", (e) => {
  const id = e.target.dataset.id;
  if (id) {
    getData(id);
  }
});

const addEvent = async (e) => {
  const id = e.target.dataset.id;
  try {
    const res = await fetch(
      `https://jsonplaceholder.typicode.com/comments/${id}`
    );
    const data = await res.json();
    console.log(data);
    addData(data);
    totalCount();
  } catch (error) {}
};

dataList.addEventListener("click", addEvent);
openS.addEventListener("click", () => {
  storage.classList.toggle("active");

  document.body.style.overflow = "hidden";
  renderStorage();
});
closeM.addEventListener("click", () => {
  storage.classList.toggle("active");
  document.body.style.overflow = "auto";
});

storageList.addEventListener("click", (e) => {
  let id = Number(e.target.dataset.id);
  if (id) {
    const data = getStData();
    localStorage.setItem(
      "product",
      JSON.stringify(data.filter((item) => item.id !== id))
    );
  }
  totalCount();
  renderStorage();
});
