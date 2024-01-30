const getStData = () => {
  const res = JSON.parse(localStorage.getItem("product"));
  console.log(res);

  return res;
};

const renderStorage = () => {
  const data = getStData();
  if (data) {
    storageList.innerHTML = data.map(
      (item) =>
        `
          <li class="backet__item">
            <h2 class="backet__title">${item.name}</h2>
            <button data-id="${item.id}">delete</button>
          </li>
          `
    );
  }
};

const addData = (data) => {
  const oldData = getStData();
  if (oldData) {
    const existingData = oldData.findIndex((item) => item.id === data.id);
    if (existingData !== -1) {
      oldData[existingData] = data;
      localStorage.setItem("product", JSON.stringify([oldData]));
    } else {
      localStorage.setItem("product", JSON.stringify([...oldData, data]));
    }
  } else {
    localStorage.setItem("product", JSON.stringify([data]));
  }
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
const pagenation = (id) => {
  getData(id);
};
pageBox.addEventListener("click", (a) => {
  if (a.target.dataset.id) {
    pagenation(a.target.dataset.id);
  }
});
const addEvent = async (e) => {
  try {
    const res = await fetch(
      `https://jsonplaceholder.typicode.com/comments/${e.target.dataset.id}`
    );
    const data = await res.json();

    addData(data);
  } catch (error) {}
};
openS.addEventListener("click", () => {
  storage.classList.toggle("active");
  renderStorage();
  document.body.style.overflow = "hidden";
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
  renderStorage();
});
dataList.addEventListener("click", addEvent);
// dataList.addEventListener("click", (e) => {
//   let id = Number(e.target.dataset.id);
//   if (id) {
//     const data = getStData();

//     localStorage.setItem(
//       "product",
//       JSON.stringify(data.filter((item) => item.id !== id))
//     );
//     e.target.classList.toggle("active");
//   }
//   console.log(id);
//   renderStorage();
// });
