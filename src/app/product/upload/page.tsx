"use client";

import { useState } from "react";
import styled from "styled-components";

const UploadProduct = () => {
    const [images, setImages] = useState<File[]>([]);
    const [imagePreviews, setImagePreviews] = useState<string[]>([]);
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [originalPrice, setOriginalPrice] = useState<number>(0);
    const [discountRate, setDiscountRate] = useState<number>(0);
    const [quantity, setQuantity] = useState<number>(1);
    const [error, setError] = useState<string>("");
    const [dragIndex, setDragIndex] = useState<number | null>(null);

    const discountedPrice = Math.max(
        Math.floor(originalPrice * (1 - discountRate / 100)),
        0
    );

    const formatNumber = (value: number) => value.toLocaleString();

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const files = Array.from(e.target.files || []).slice(0, 5);
        const readers = files.map(file => {
            return new Promise<string>((resolve, reject) => {
                const reader = new FileReader();
                reader.onload = () => resolve(reader.result as string);
                reader.onerror = reject;
                reader.readAsDataURL(file);
            });
        });

        Promise.all(readers).then(previews => {
            setImages(files);
            setImagePreviews(previews);
        });
    };

    const handleDeleteImage = (index: number) => {
        const newImages = images.filter((_, i) => i !== index);
        const newPreviews = imagePreviews.filter((_, i) => i !== index);
        setImages(newImages);
        setImagePreviews(newPreviews);
    };

    const handleDragStart = (index: number) => {
        setDragIndex(index);
    };

    const handleDrop = (index: number) => {
        if (dragIndex === null || dragIndex === index) return;
        const newImages = [...images];
        const newPreviews = [...imagePreviews];

        const [draggedImage] = newImages.splice(dragIndex, 1);
        const [draggedPreview] = newPreviews.splice(dragIndex, 1);

        newImages.splice(index, 0, draggedImage);
        newPreviews.splice(index, 0, draggedPreview);

        setImages(newImages);
        setImagePreviews(newPreviews);
        setDragIndex(null);
    };

    const handleSubmit = () => {
        if (!title.trim()) return setError("제품명을 입력해주세요.");
        if (!description.trim()) return setError("소개글을 입력해주세요.");
        if (originalPrice <= 0) return setError("정가를 입력해주세요.");
        if (discountRate < 0 || discountRate > 100) return setError("할인율은 0~100 사이로 입력해주세요.");
        if (quantity < 1) return setError("수량은 1개 이상이어야 합니다.");
        if (images.length === 0) return setError("최소 1장의 이미지를 업로드해주세요.");

        setError("");
        alert("제품이 성공적으로 업로드되었습니다.");
    };

    const handleOriginalPriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value.replace(/[^\d]/g, "").replace(/^0+(?=\d)/, "");
        setOriginalPrice(Number(value));
    };

    const handleDiscountChange = (value: number) => {
        setDiscountRate(Math.min(Math.max(value, 0), 100));
    };

    return (
        <Wrapper>
            <h1>제품 업로드</h1>
            <Section>
                <Label>제품 이미지 (최대 5장)</Label>
                <UploadRow>
                    <CustomFileLabel htmlFor="file-upload">이미지 선택</CustomFileLabel>
                    <ImageCount>{images.length} / 5장 업로드됨</ImageCount>
                </UploadRow>
                <HiddenFileInput id="file-upload" type="file" multiple accept="image/*" onChange={handleImageChange} />
                <PreviewFlexContainer>
                    {imagePreviews.map((src, idx) => (
                        <Preview
                            key={idx}
                            draggable
                            onDragStart={() => handleDragStart(idx)}
                            onDragOver={(e) => e.preventDefault()}
                            onDrop={() => handleDrop(idx)}
                        >
                            <img src={src} alt={`preview-${idx}`} />
                            <DeleteButton onClick={() => handleDeleteImage(idx)}>×</DeleteButton>
                        </Preview>
                    ))}
                </PreviewFlexContainer>
            </Section>

            <Section>
                <Label>제품명</Label>
                <Input value={title} onChange={(e) => setTitle(e.target.value)} />

                <Label>간단한 소개글</Label>
                <Textarea value={description} onChange={(e) => setDescription(e.target.value)} />
            </Section>

            <Section>
                <Label>가격 정보</Label>
                <Row>
                    <HalfInput
                        type="text"
                        value={formatNumber(originalPrice)}
                        onChange={handleOriginalPriceChange}
                        placeholder="정가 (원)"
                    />
                    <HalfInput
                        type="number"
                        value={discountRate}
                        onChange={(e) => handleDiscountChange(Number(e.target.value))}
                        placeholder="할인율 (%)"
                        min={0}
                        max={100}
                    />
                </Row>
                <SliderRow>
                    <Slider
                        type="range"
                        min={0}
                        max={100}
                        value={discountRate}
                        onChange={(e) => handleDiscountChange(Number(e.target.value))}
                    />
                    <SliderValue>{discountRate}%</SliderValue>
                </SliderRow>
                <PricePreview>
                    할인된 가격: <strong>{discountedPrice.toLocaleString()}원</strong>
                </PricePreview>
            </Section>

            <Section>
                <Label>수량</Label>
                <Input type="number" value={quantity} onChange={(e) => setQuantity(Number(e.target.value))} min={1} />
            </Section>

            {error && <ErrorText>{error}</ErrorText>}

            <SubmitButton onClick={handleSubmit}>제품 등록</SubmitButton>
        </Wrapper>
    );
};

export default UploadProduct;

const Wrapper = styled.div`
    width: 100%;
    max-width: 1000px;
    margin: 0 auto;
    padding: 32px;
    font-family: sans-serif;
    margin-top: 4rem;
`;

const Section = styled.div`
    margin-bottom: 32px;
`;

const Label = styled.div`
    font-weight: bold;
    margin-bottom: 8px;
`;

const Input = styled.input`
    width: 100%;
    padding: 8px;
    font-size: 16px;
    margin-bottom: 16px;
    border: 1px solid #ccc;
    border-radius: 6px;
`;

const HalfInput = styled.input`
    width: 50%;
    padding: 8px;
    font-size: 16px;
    border: 1px solid #ccc;
    border-radius: 6px;
`;

const SliderRow = styled.div`
    display: flex;
    align-items: center;
    gap: 12px;
    margin-top: 8px;
`;

const Slider = styled.input`
    flex: 1;
`;

const SliderValue = styled.div`
    font-size: 1rem;
    min-width: 48px;
    text-align: right;
    color: #333;
`;

const Row = styled.div`
    display: flex;
    gap: 12px;
    margin-bottom: 8px;
`;

const Textarea = styled.textarea`
    width: 100%;
    padding: 8px;
    font-size: 16px;
    height: 100px;
    border: 1px solid #ccc;
    border-radius: 6px;
`;

const UploadRow = styled.div`
    display: flex;
    align-items: center;
    gap: 12px;
    margin-bottom: 12px;
`;

const CustomFileLabel = styled.label`
    padding: 8px 16px;
    background-color: #555;
    color: white;
    border-radius: 6px;
    cursor: pointer;
    font-size: 14px;
    &:hover {
        background-color: #333;
    }
`;

const HiddenFileInput = styled.input`
    display: none;
`;

const ImageCount = styled.span`
    font-size: 1rem;
    color: #666;
`;

const PreviewFlexContainer = styled.div`
    display: flex;
    gap: 12px;
    overflow-x: auto;
`;

const Preview = styled.div`
    position: relative;
    width: 120px;
    height: 120px;
    border-radius: 8px;
    overflow: hidden;
    border: 1px solid #ccc;
    flex-shrink: 0;

    img {
        width: 100%;
        height: 100%;
        object-fit: cover;
    }
`;

const DeleteButton = styled.button`
    position: absolute;
    top: 4px;
    right: 4px;
    background: rgba(0, 0, 0, 0.6);
    color: white;
    border: none;
    border-radius: 50%;
    width: 20px;
    height: 20px;
    cursor: pointer;
    font-size: 14px;
    line-height: 20px;
    text-align: center;
    padding: 0;
`;

const PricePreview = styled.div`
    margin-top: 12px;
    font-size: 18px;
    color: #444;
`;

const ErrorText = styled.p`
    width: 100%;
    text-align: center;
    color: red;
    margin-bottom: 16px;
`;

const SubmitButton = styled.button`
    width: 100%;
    padding: 12px;
    background-color: #222;
    color: white;
    font-size: 16px;
    border: none;
    border-radius: 6px;
    cursor: pointer;

    &:hover {
        background-color: #444;
    }
`;