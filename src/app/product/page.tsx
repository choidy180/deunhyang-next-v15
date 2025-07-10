"use client";
import Image from "next/image";
import { useState } from "react";
import styled from "styled-components";

const DuenHyangProduct = () => {
    const images = [
        "https://deunhyang.com/web/product/medium/202308/7c70fce27fcbe30ddfdcd427fab872da.jpg",
        "https://deunhyang.com/web/product/medium/202409/28349ec56105377538925e66bf5e1f2b.png",
        "https://deunhyang.com/web/product/medium/202308/7c70fce27fcbe30ddfdcd427fab872da.jpg",
        "https://deunhyang.com/web/product/medium/202308/7c70fce27fcbe30ddfdcd427fab872da.jpg",
        "https://deunhyang.com/web/product/medium/202308/7c70fce27fcbe30ddfdcd427fab872da.jpg",
    ];

    const price = 21000;

    const [selected, setSelected] = useState(0);
    const [option, setOption] = useState("");
    const [quantity, setQuantity] = useState(1);

    const handleQuantityChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        const numeric = value.replace(/[^0-9]/g, "");
        setQuantity(numeric ? Math.max(1, parseInt(numeric, 10)) : 1);
    };

    const increaseQty = () => setQuantity((prev) => prev + 1);
    const decreaseQty = () => setQuantity((prev) => (prev > 1 ? prev - 1 : 1));

    const totalPrice = option ? price * quantity : 0;

    return (
        <Container>
            <ImageSection>
                <Image
                    src={images[selected]}
                    alt="product"
                    width={400}
                    height={400}
                />
                <ThumbnailRow>
                    {images.map((img, idx) => (
                        <Thumb
                            key={idx}
                            src={img}
                            selected={selected === idx}
                            onClick={() => setSelected(idx)}
                        />
                    ))}
                </ThumbnailRow>
            </ImageSection>

            <InfoSection>
                <h3>토마토 텃밭 퍼퓸 디퓨저, Granny Garden 120ML</h3>
                <p>풋풋하고 쌉싸래한 토마토 텃밭의 내음</p>
                <Price>
                    <del>KRW 35,000</del>
                    <Highlight>KRW 21,000</Highlight>
                    <span>배송비: 무료 / 배송방법: 택배</span>
                </Price>
                <Select
                    value={option}
                    onChange={(e) => setOption(e.target.value)}
                >
                    <option value="">- [필수] 옵션을 선택해 주세요 -</option>
                    <option value="granny">Granny Garden 120ml</option>
                </Select>
                {option && (
                    <QuantityWrapper>
                        <QtyButton onClick={decreaseQty}>-</QtyButton>
                        <Input
                            type="text"
                            inputMode="numeric"
                            pattern="[0-9]*"
                            value={quantity.toString()}
                            onChange={handleQuantityChange}
                        />
                        <QtyButton onClick={increaseQty}>+</QtyButton>
                    </QuantityWrapper>
                )}
                <span style={{ color: "red", fontSize: "14px" }}>
                    ! 옵션 선택 시 아래에 상품이 추가됩니다.
                </span>
                <div>
                    총 상품금액(수량): <Highlight>{quantity}개</Highlight> /{' '}
                    <Highlight>KRW {totalPrice.toLocaleString()}</Highlight>
                </div>
                <ButtonGroup>
                    <Button style={{ background: "#333", color: "#fff" }}>바로 구매하기</Button>
                    <Button style={{ background: "#fff", border: "1px solid #ccc" }}>장바구니</Button>
                    <Button style={{ background: "#fff", border: "1px solid #ccc" }}>관심상품</Button>
                </ButtonGroup>
            </InfoSection>
        </Container>
    )
}

const Container = styled.div`
    display: flex;
    flex-direction: row;
    gap: 40px;
    padding: 40px;

    @media (max-width: 768px) {
        flex-direction: column;
        align-items: center;
    }
`;

const ImageSection = styled.div`
    display: flex;
    flex-direction: column;
    gap: 10px;
`;

const ThumbnailRow = styled.div`
    display: flex;
    gap: 6px;
    flex-wrap: wrap;
`;

const Thumb = styled.img<{ selected: boolean }>`
    width: 60px;
    height: 60px;
    object-fit: cover;
    border: 2px solid ${({ selected }) => (selected ? "black" : "#ccc")};
    cursor: pointer;
`;

const InfoSection = styled.div`
    display: flex;
    flex-direction: column;
    gap: 12px;
    max-width: 480px;
    width: 100%;
`;

const Price = styled.div`
    display: flex;
    flex-direction: column;
    gap: 4px;
`;

const Select = styled.select`
    padding: 8px;
    width: 100%;
    border: 1px solid #ccc;
`;

const QuantityWrapper = styled.div`
    display: flex;
    align-items: center;
    gap: 8px;
`;

const Input = styled.input`
    padding: 8px;
    width: 60px;
    text-align: center;
    border: 1px solid #ccc;
`;

const QtyButton = styled.button`
    padding: 8px 12px;
    font-size: 16px;
    border: 1px solid #ccc;
    background: #f5f5f5;
    cursor: pointer;
`;

const ButtonGroup = styled.div`
    display: flex;
    gap: 12px;
    flex-wrap: wrap;
`;

const Button = styled.button`
    padding: 12px;
    flex: 1;
    border: none;
    font-size: 16px;
    cursor: pointer;
`;

const Highlight = styled.span`
    color: #0070f3;
    font-weight: bold;
`;


export default DuenHyangProduct;