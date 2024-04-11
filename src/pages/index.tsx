import React from "react";
import Head from "next/head";
import Link from "next/link";
import { Button, Flex, Group, Stack, Text } from "@mantine/core";
import styled from "styled-components";
import { MdChevronRight } from "react-icons/md";
import Layout from "src/layout/Layout";
import EditorPage from './editor';

const StyledHeroSection = styled.section`
  position: relative;
  padding: 4em 4em 2em;
  background-size: 20px 20px;
  background-image: linear-gradient(to right, #1a1c20 1px, transparent 1px),
    linear-gradient(to bottom, #1a1c20 1px, transparent 1px);

  background-position: top center;
  image-rendering: pixelated;
  -webkit-mask-image: linear-gradient(to bottom, transparent, 20%, white, 90%, transparent);
  mask-image: linear-gradient(to bottom, transparent, 20%, white, 90%, transparent);

  @media only screen and (max-width: 768px) {
    padding: 2em;
  }
`;

const StyledHeroSectionBody = styled.div`
  position: relative;
  z-index: 1;
  min-height: 70vh;
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 0 auto;
  width: fit-content;
  gap: 4vw;
`;

const StyledHeroTitle = styled.h1`
  font-size: clamp(24px, 4vw, 50px);
  color: white;

  @media only screen and (max-width: 768px) {
    font-size: 34px;
  }
`;

const StyledHeroText = styled.p`
  font-size: clamp(18px, 2vw, 22px);
  color: #bcbcbc;
  max-width: 600px;

  @media only screen and (max-width: 768px) {
    font-size: 20px;
    max-width: 100%;
  }
`;

const StyledImageWrapper = styled.div`
  border: 8px solid #36393e;
  border-radius: 6px;
  border-top: none;
  width: 100%;
  max-width: 40vw;
  flex: auto;
  height: fit-content;
  margin: 0 auto;

  img {
    display: block;
    width: 100%;
  }

  @media only screen and (max-width: 768px) {
    display: none;
  }
`;

const StyledFeaturedSection = styled.section`
  padding: 0 1em;

  img {
    filter: brightness(70%) grayscale(100%);
    transition: filter 200ms ease;
  }

  img:hover {
    filter: none;
  }
`;

export const HomePage = () => {
  return (
    <EditorPage />  
  );
};

export default HomePage;
