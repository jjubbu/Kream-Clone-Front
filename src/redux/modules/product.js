import { createAction, handleActions } from "redux-actions";
import { produce } from "immer";
import { apis } from "../../lib/axios";

// 액션
const GET_PRODUCT = "GET_PRODUCT"; // 제품 리스트 가져오기
const SET_BOOKMARK = "SET_BOOKMARK"; // 제품 북마크하기
const SET_BOOKMARKCNT = "SET_BOOKMARKCNT"; //제품 북마크 개수
const DELETE_BOOKMARK = "DELETE_BOOKMARK"; //제품 북마크취소하기
const LOAD_PRODUCT_BY_ID = "LOAD_PRODUCT_BY_ID";

// 액션 생성 함수
const getProducts = createAction(GET_PRODUCT, (product) => ({ product }));
const setBookmark = createAction(
  SET_BOOKMARK,
  (productIdx, bookmark, page) => ({
    productIdx,
    bookmark,
    page,
  })
);

const setBookmarkCnt = createAction(SET_BOOKMARKCNT, (bookmarkCnt) => ({
  bookmarkCnt,
}));

const loadProductById = createAction(LOAD_PRODUCT_BY_ID, (product) => ({
  product,
}));


// initialState
const initialState = {
  list: [],
  product: null,
};

// 미들웨어 액션
const loadProductByIdMW = (productId) => {
  return function (dispatch, getState, { history }) {
    apis
      .loadProductByIdAX(productId)
      .then((response) => {
        const product = response.data;
        console.log("[Detail] load product", product);
        dispatch(loadProductById(product));
      })
      .catch((error) => {
        window.alert("상품 정보를 불러오는데 실패하였습니다.");
        console.log("[Detail] load product", error);
        // history.push("/");
        history.goBack();
      });
  };
};

const getProductsMW = () => {
  return function (dispatch, getState, { history }) {
    apis
      .getProductsAX()
      .then((res) => {
        console.log("[Main] get product data:::", res.data);
        const productList = res.data;
        dispatch(getProducts(productList));
      })
      .catch((err) => {
        console.log(err);
      });
  };
};

// 북마크
// page는 북마크를 실행하는 페이지의 종류에 따라 "main", "detail"로 값을 받을 수 있다.
// 메인 페이지는 "main", 상세페이지는 "detail"로 설정한다.
const setBookmarkMW = (id, bookmark, page) => {
  return function (dispatch, getState, { history }) {
    const productList = getState().product.list.productList;
    console.log("북마크 미들웨어에서 데이터: ", productList);
    const idx = productList.findIndex((item) => item.id == id);
    console.log("idx: ", idx);
    apis
      .setBookmarkAX({
        productId: id,
        bookmark: bookmark,
      })
      .then((res) => {
        console.log("[Main] bookmark response data:::", res.data);
        // 북마크 요청이 잘 완료됨
        dispatch(setBookmark(idx, bookmark, page));
      })
      .catch((err) => {
        console.log(err);
      });
  };
};

// 리듀서
export default handleActions(
  {
    [GET_PRODUCT]: (state, action) =>
      produce(state, (draft) => {
        draft.list = action.payload.product;
      }),
    [SET_BOOKMARK]: (state, action) =>
      produce(state, (draft) => {
        // 메인페이지에서 북마크 한 경우
        if (action.payload.page == "main") {
          const index = action.payload.productIdx;
          if (draft.list.productList[index].bookMark === true) {
            draft.list.productList[index].bookMark = false;
          } else {
            draft.list.productList[index].bookMark = true;
          }
          return;
        } else {
          // 상세페이지에서 북마크 한 경우
          const index = action.payload.productIdx;
          if (action.payload.bookmark === true) {
            if (draft.product.bookMarkCnt !== 0) {
              draft.product.bookMarkCnt -= 1;
              draft.list.productList[index].bookMark = false;
            }
          } else {
            draft.product.bookMarkCnt += 1;
            draft.list.productList[index].bookMark = true;
          }
        }
      }),
    [SET_BOOKMARKCNT]: (state, action) =>
      produce(state, (draft) => {
        draft.product.bookmarkCnt = action.payload.bookmarkCnt;
      }),
    [LOAD_PRODUCT_BY_ID]: (state, action) =>
      produce(state, (draft) => {
        draft.product = action.payload.product;
      }),
  },
  initialState
);

const actionCreators = {
  getProducts,
  setBookmark,
  setBookmarkCnt,
  getProductsMW,
  setBookmarkMW,
  loadProductByIdMW,
};

export { actionCreators };
