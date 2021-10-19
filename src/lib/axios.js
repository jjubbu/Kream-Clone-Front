import axios from "axios";
import { Cookies } from "react-cookie";

const cookies = new Cookies();

const instance = axios.create({
  // 기본적으로 우리가 바라볼 서버의 주소
  baseURL: "http://localhost:4000/",
  // baseURL: "http://13.124.198.97:4000/",
  headers: {
    "content-type": "application/json;charset=UTF-8",
    accept: "application/json",
    Authorization: `Bearer ${cookies.get("token")}`,
  },
  withCredentials: true,
});

export const apis = {
  // 상품 아이디로 상품 정보 불러오기
  // loadProductByIdAX: (productId) => instance.get(`/product/${productId}`),
  loadProductByIdAX: (productId) => instance.get(`/product`),

  // 사이즈별 가격 조회
  getPriceBySizeAX: (productId, size) => instance.get(`/priceBySize`),

  // 최저/최고가 조회
  getPriceBestAX: (productId, role) => instance.get(`/priceBest`),
  //전체 post 조회
  getProductsAX: () => instance.get("/product"),
  //마이페이지 데이터 가져오기
  getDataAX: () => instance.get("/mypage"),
  //북마크하기
  setBookMarkAX: (productId) => instance.post("/user/bookmark", productId),
};
