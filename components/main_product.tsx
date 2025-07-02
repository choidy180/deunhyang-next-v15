'use client';

import Image from "next/image";
import { useEffect, useState } from "react";
import styled from "styled-components";
import mainProductList from '../json/mainProduct.json';
import { useRouter } from "next/navigation";

// 타입 정의
type ProductTitleList = string[];

type Product = {
    image: string;
    title: string;
    description: string;
    nature_price: number;
    sale_price: number;
    sold_out: boolean;
    uid: string;
};

const MainProduct = () => {
    const router = useRouter();

    const prdTitList: ProductTitleList = ['베스트', '신제품NEW&선물SET', '인센스스틱', '인센스홀더', '세트SET'];
    const [select, setSelect] = useState(0);
    const [loadedCount, setLoadedCount] = useState(0);
    const [fadeKey, setFadeKey] = useState(0); // key 변경용

    const isLoaded = loadedCount === 3;

    useEffect(() => {
        setLoadedCount(0); // 이미지 로딩 상태 초기화
        setFadeKey(prev => prev + 1); // 컴포넌트 강제 재마운트용
    }, [select]);

    return (
        <Wrapper>
            <TitArea>
                <p>Deunhyang</p>
                <h4>든향</h4>
            </TitArea>

            <SlickDots>
                {prdTitList.map((item, index) => (
                    <PrdTab
                        key={index}
                        className={select === index ? 'select' : ''}
                        onClick={() => setSelect(index)}
                    >
                        #{item}
                    </PrdTab>
                ))}
            </SlickDots>

            <FadeContainer $loaded={isLoaded} key={fadeKey}>
                {[0, 1, 2].map((_, index) => {
                    const productIndex = index + select * 3;
                    const product: Product = mainProductList[productIndex];

                    return (
                        <ProductBox key={index} onClick={()=> product.sold_out === false ? router.push(`/product?uid=${product.uid}`) : alert('현재 품절된 상품입니다.')}>
                            <ImageWrap>
                                <Image
                                    src={product.image}
                                    width={360}
                                    height={360}
                                    alt={product.title}
                                    style={{ objectFit: "cover", borderRadius: "9999px" }}
                                    onLoadingComplete={() => setLoadedCount(prev => prev + 1)}
                                />
                                <div className="number">
                                    <p>BEST {index + 1}</p>
                                </div>
                            </ImageWrap>
                            <p className="title">{product.title}</p>
                            <p className="description">{product.description}</p>
                            <del>KRW {product.nature_price.toLocaleString()}</del>
                            <span>KRW {product.sale_price.toLocaleString()}</span>
                            {
                                product.sold_out === true &&
                                (
                                    <span className="soldout">품절</span>
                                )
                            }
                        </ProductBox>
                    );
                })}
            </FadeContainer>
        </Wrapper>
    );
};

const Wrapper = styled.div`
    width: 1064px;
    max-width: calc(100vw - 12px);

    display: flex;
    flex-direction: column;
    justify-content: start;
    align-items: center;

    margin-top: 10rem;
`;

const TitArea = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    p {
        font-size: 1rem;
    }

    h4 {
        font-size: 3rem;
        line-height: 3rem;
        font-weight: 300;
        margin: 1rem;
    }

    &::after {
        display: block;
        margin: 18px auto 24px;
        width: 14px;
        height: 1px;
        background-color: #aaa;
        content: '';
    }
`;

const SlickDots = styled.div`
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 1rem;
`;

const PrdTab = styled.span`
    font-size: 1.4rem;
    color: #aeaeae;
    cursor: pointer;

    &.select {
        color: #000;
    }
`;

const FadeContainer = styled.div<{ $loaded: boolean }>`
    width: 1064px;
    max-width: calc(100vw - 12px);
    min-width: 980px;

    display: flex;
    justify-content: space-between;
    align-items: start;

    gap: 50px;
    margin: 4rem 0;

    opacity: ${({ $loaded }) => ($loaded ? 1 : 0)};
    transition: opacity .6s ease;
`;

const ProductBox = styled.div`
    width: 33.3333%;
    display: flex;
    flex-direction: column;
    justify-content: start;
    align-items: center;

    cursor: pointer;

    .title {
        font-family: 'Noto Serif KR', serif, 'Roboto', 'Noto Sans KR', sans-serif;
        font-weight: 100;
        font-size: 1.1rem;
        line-height: 1.4rem;
        margin-top: 1rem;
        color: #555555;
        text-align: justify;
        text-align-last: center;
    }

    .description {
        color: #999999;
        font-size: .8rem;
        margin-top: .8rem;
    }

    del {
        font-size: .8rem;
        margin-top: .6rem;
        color: #555555;
    }

    span {
        margin-top: .2rem;
        font-size: 1rem;
        color: #41556b;
    }

    .soldout {
        padding: 2px 8px;
        font-size: .7rem;
        line-height: .7rem;
        background-color: #000;
        color: white;
        margin-top: .4rem;
    }
`;

const ImageWrap = styled.div`
    position: relative;
    width: 360px;
    height: 360px;

    img {
        border-radius: 9999px;
    }

    .number {
        position: absolute;
        left: 28px;
        top: 12px;
        width: 74px;
        height: 74px;
        color: #fff;
        background-color: #333;
        border-radius: 50%;
        z-index: 5;

        p {
            line-height: 73px;
            text-align: center;
            font-size: .8rem;
            font-family: 'ChosunGs';
        }
    }
`;

export default MainProduct;
