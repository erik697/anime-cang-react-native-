import axios from 'axios';

async function getListTop() {
  let dat;
  await axios
    .get('https://api.jikan.moe/v4/top/anime?limit=10')
    .then(function (response) {
      console.log('udah jalann');

      dat = response.data;
      // console.log('ini data', dat.data);
      return dat;
      // setData(response.data.data);
    })
    .catch(function (error) {
      console.log(error);
    });
  return dat;
}

async function getList() {
  let dat;
  await axios
    .get('https://api.jikan.moe/v4/anime')
    .then(function (response) {
      console.log('udah jalann');

      dat = response.data;
      // console.log('ini data', dat.data);
      return dat;
      // setData(response.data.data);
    })
    .catch(function (error) {
      console.log(error);
    });
  return dat;
}

async function getListPage(page: string) {
  let dat;
  await axios
    .get('https://api.jikan.moe/v4/anime?page=' + page)
    .then(function (response) {
      console.log('udah jalann');

      dat = response.data;
      // console.log('ini data', dat.data);
      return dat;
      // setData(response.data.data);
    })
    .catch(function (error) {
      console.log(error);
    });
  return dat;
}

async function getListRecomendation() {
  let dat;
  await axios
    .get('https://api.jikan.moe/v4/recommendations/anime?limit=10')
    .then(function (response) {
      console.log('udah jalann');

      dat = response.data;
      // console.log('ini data333', dat.data[0].entry);
      return dat;
      // setData(response.data.data);
    })
    .catch(function (error) {
      console.log(error);
    });
  return dat;
}

async function getGenre() {
  let dat;
  await axios
    .get('https://api.jikan.moe/v4/genres/anime?filter=genres')
    .then(function (response) {
      // console.log('udah jalann');

      dat = response.data;
      // console.log('ini data333', dat.data[0].entry);
      return dat;
      // setData(response.data.data);
    })
    .catch(function (error) {
      console.log(error);
    });
  return dat;
}

async function getFilter(filter: string) {
  let dat;
  await axios
    .get(filter)
    .then(function (response) {
      // console.log('udah jalann');

      dat = response.data;
      // console.log('ini data', dat.data);
      return dat;
      // setData(response.data.data);
    })
    .catch(function (error) {
      console.log(error);
    });
  return dat;
}

async function getListFilter(filter: string, page: string) {
  let dat;
  await axios
    .get(filter + '&page=' + page)
    .then(function (response) {
      console.log('udah jalann');

      dat = response.data;
      // console.log('ini data', dat.data);
      return dat;
      // setData(response.data.data);
    })
    .catch(function (error) {
      console.log(error);
    });
  return dat;
}

export {
  getListTop,
  getList,
  getListRecomendation,
  getGenre,
  getFilter,
  getListPage,
  getListFilter,
};
