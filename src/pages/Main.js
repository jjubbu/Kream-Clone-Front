import React from "react";
import {Helmet} from "react-helmet";

import {Grid, Text, Image} from "../elements";
import Header from "../components/Header";
import Card from "../components/Card";
import styled from "styled-components";
import Footer from "../components/Footer";
import Slider from "../components/Slider";

import {useDispatch, useSelector} from "react-redux";
import {actionCreators as productActions} from "../redux/modules/product";
import {actionCreators as headerActions} from "../redux/modules/transaction";

const Main = () => {
    const dispatch = useDispatch();
    const productList = useSelector((state) => state.product.list.productList);
    const is_login = useSelector((state) => state.user.is_login);

    React.useEffect(() => {
        console.log("[main] product list:::", productList);
        dispatch(productActions.getProductsMW());
        dispatch(headerActions.headerTitle(""));
    }, [is_login]);

    const StyledButton = styled.button `
    margin: 20px auto 0px;
    height: 40px;
    font-size: 14px;
    padding: 0px 30px;
    background-color: #fff;
    color: rgba(34, 34, 34, 0.8);
    border: 1px solid rgb(211, 211, 211);
    border-radius: 12px;
    cursor: pointer;
    text-align: center;
  `;

    return (
        <React.Fragment>
            <Helmet>
                <title>KREAM clone coding</title>
                <meta name="title" content="KREAM clone coding" data-react-helmet="true"/>
                <meta
                    name="description"
                    content="항해 99 3기 KREAM 클론코딩"
                    data-react-helmet="true"/>

                <meta property="og:type" content="website" data-react-helmet="true"/>
                <meta
                    property="og:url"
                    content="http://kream-clone-coding.s3-website.ap-northeast-2.amazonaws.com/"
                    data-react-helmet="true"/>
                <meta
                    property="og:title"
                    content="KREAM clone coding"
                    data-react-helmet="true"/>
                <meta
                    property="og:description"
                    content="항해 99 3기 KREAM 클론코딩"
                    data-react-helmet="true"/>
                <meta property="og:image" content="./Frame 1.png"/>

                <meta
                    property="twitter:card"
                    content="summary_large_image"
                    data-react-helmet="true"/>
                <meta
                    property="twitter:url"
                    content="http://kream-clone-coding.s3-website.ap-northeast-2.amazonaws.com/"
                    data-react-helmet="true"/>
                <meta
                    property="twitter:title"
                    content="KREAM clone coding"
                    data-react-helmet="true"/>
                <meta
                    property="twitter:description"
                    content="항해 99 3기 KREAM 클론코딩"
                    data-react-helmet="true"/>
                <meta
                    property="twitter:image"
                    content="./Frame 1.png"
                    data-react-helmet="true"/>
            </Helmet>
            <Header/> {/* 슬라이드 베너 */}
            <SliderSection>
                <Grid width="100%" height="480px" margin="0px 0px 45px 0px">
                    <Slider></Slider>
                </Grid>
            </SliderSection>
            {/* Just Dropped */}
            <Grid margin="40px auto 0px" maxWidth="1280px" padding="0px 40px" height="41px">
                <Grid margin="0px auto" padding="0px">
                    <Text fontSize="20px" lineHeight="22px" margin="0px" padding="0px">
                        Just Dropped
                    </Text>
                    <Text
                        fontSize="14px"
                        lineHeight="16px"
                        color="rgba(34,34,34,.5)"
                        fontWeight="400"
                        margin="0px"
                        padding="0px">
                        발매 상품
                    </Text>
                </Grid>
            </Grid>
            {/* 상품 리스트 */}
            <Grid margin="0px" backgroundColor="#fff" padding="0px" height="auto">
                <Grid
                    maxWidth="1280px"
                    padding="0px 28px"
                    margin="0px auto"
                    display="Grid"
                    gridColumns="repeat(4, 1fr)"
                    gridRows="repeat(1, minmax(auto,auto))">
                    {/* 상품 리스트를 감싸는 컨테이너 */}
                    {
                        productList && productList.map((product) => {
                            return <Card key={product.id} product={product}></Card>;
                        })
                    }
                </Grid>
            </Grid>
            {/* 상품 리스트 끝 */}
            {/* 버튼 */}
            <Grid
                margin="0px"
                padding="0px 32px"
                height="62px"
                display="flex"
                justifyContent="center">
                <StyledButton>더보기</StyledButton>
            </Grid>
            {/* 중간 배너 시작*/}
            <Grid
                margin="62px 0px 0px 0px"
                width="100%"
                height="480px"
                backgroundColor="#EB6035">
                <Image
                    width="100%"
                    height="100%"
                    backgroundSize="contain"
                    margin="0 auto"
                    src="https://kream-phinf.pstatic.net/MjAyMTEwMTVfMjQ0/MDAxNjM0Mjc2MzY0ODky.4ajOLvDdvoLxxz-Kdj5An3gtlFMlQnx-L2LSMCC9bFAg._Sepzgo_SUwZHGgleutbeV8-UL87IMngGJPLAAaqBt4g.PNG/a_037d39a2b2794477a67aa91b89292dc2.png?type=l"></Image>
            </Grid>

            {/* 중간 배너 끝 */}
            <Grid height="200px" display="flex" margin="62px 0px 0px 0px">
                <ImageBannerLeft
                    onClick={() => {
                        window.open("https://kream.co.kr/about/");
                    }}>
                    <Text fontSize="12px" color="#fff" margin="0px 0px 10px 0px">
                        SERVICE GUIDE
                    </Text>
                    <Text
                        letterSpacing="-1.7px"
                        fontSize="16px"
                        fontWeight="400"
                        color="#fff"
                        lineHeight="20px"
                        margin="0px 0px 15px 0px">
                        KREAM은 처음이지?
                        <br/>
                        서비스 소개를 확인해보세요.
                    </Text>
                    <Grid
                        padding="0px 7px"
                        borderRadius="6px"
                        align="center"
                        display="inline-block"
                        width="76px"
                        height="27px"
                        border="1px solid hsla(0,0%,100%,.8)">
                        <Text
                            margin="0px"
                            width="auto"
                            fontSize="12px"
                            color="#fff"
                            fontWeight="400"
                            lineHeight="25px"
                            letterSpacing="-1px">
                            서비스 안내
                        </Text>
                    </Grid>
                </ImageBannerLeft>
                <ImageBannerRight>
                    <Text fontSize="12px" color="#fff" margin="0px 0px 10px 0px">
                        DOWNLOAD THE APP
                    </Text>
                    <Text
                        letterSpacing="-1.7px"
                        fontSize="16px"
                        fontWeight="400"
                        color="#fff"
                        lineHeight="20px"
                        margin="0px 0px 15px 0px">
                        KREAM 앱을 설치하여
                        <br/>
                        한정판 스니커즈를 FLEX
                        <span
                            style={{
                                paddingLeft: "4px",
                                textShadow: "-1px 0 black, 0 1px black, 1px 0 black, 0 -1px black"
                            }}>
                            하세요!
                        </span>
                    </Text>
                    <Grid
                        padding="0px 7px"
                        borderRadius="6px"
                        align="center"
                        display="inline-block"
                        width="76px"
                        height="27px"
                        border="1px solid hsla(0,0%,100%,.8)">
                        <Text
                            margin="0px"
                            width="auto"
                            fontSize="12px"
                            color="#fff"
                            fontWeight="400"
                            lineHeight="25px"
                            letterSpacing="-1px">
                            앱 설치하기
                        </Text>
                    </Grid>
                </ImageBannerRight>
            </Grid>
            {/* 푸터 */}
            <Footer></Footer>
        </React.Fragment>
    );
};

const ImageBannerLeft = styled.div `
  padding: 36px 32px 0px;
  display: flex;
  flex-direction: column;
  color: #fff;
  background-color: #565656;
  width: 50%;
  height: 100%;
  background-image: url("https://kream.co.kr/_nuxt/img/home_banner_bottom1.79549cb.png");
  background-position: right;
  background-size: contain;
  background-repeat: no-repeat;
  cursor: pointer;
`;
const ImageBannerRight = styled.div `
  padding: 36px 32px 0px;
  display: flex;
  flex-direction: column;
  color: #fff;
  background-color: #3b3a3c;
  width: 50%;
  height: 100%;
  background-image: url("https://kream.co.kr/_nuxt/img/home_banner_bottom2.0077547.png");
  background-position: right;
  background-size: contain;
  background-repeat: no-repeat;
  cursor: pointer;
`;

const SliderSection = styled.section `
  .slick-slider.slick-initialized {
    position: relative;
  }
  .slick-dots {
    position: absolute;
    bottom: 10px;
  }

  .slick-arrow {
    position: absolute;
    z-index: 100;

    bottom: 50%;
    transform: translateY(-50%);
    width: 80px;
    height: 80px;
    font-size: 0;
    color: rgba(0, 0, 0, 0);
    cursor: pointer;
  }
  .slick-arrow.slick-next {
    right: 0;
    &::before {
      content: "";
      z-index: 1;
      background-image: url("data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI4MCIgaGVpZ2h0PSI4MCIgZmlsbD0ibm9uZSIgdmlld0JveD0iMCAwIDgwIDgwIj4KICAgIDxwYXRoIHN0cm9rZT0iI0JCQiIgc3Ryb2tlLXdpZHRoPSIxLjUiIGQ9Ik0zMCAyMGwyMCAyMC0yMCAyMCIvPgo8L3N2Zz4K");
      width: 80px;
      height: 80px;
      display: block;
    }
  }
  .slick-arrow.slick-prev {
    left: 0;
    &::before {
      content: "";
      z-index: 1;
      background-image: url("data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI4MCIgaGVpZ2h0PSI4MCIgZmlsbD0ibm9uZSIgdmlld0JveD0iMCAwIDgwIDgwIj4KICAgIDxwYXRoIHN0cm9rZT0iI0JCQiIgc3Ryb2tlLXdpZHRoPSIxLjUiIGQ9Ik01MCA2MEwzMCA0MGwyMC0yMCIvPgo8L3N2Zz4K");
      width: 80px;
      height: 80px;
      display: block;
    }
  }
`;

export default Main;
