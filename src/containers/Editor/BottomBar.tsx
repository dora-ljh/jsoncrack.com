import React from "react";
import Head from "next/head";
import { useRouter } from "next/router";
import { Flex, Popover, Text } from "@mantine/core";
import styled from "styled-components";
import toast from "react-hot-toast";
import {
  AiOutlineCloudSync,
  AiOutlineCloudUpload,
  AiOutlineLink,
  AiOutlineLock,
  AiOutlineUnlock,
} from "react-icons/ai";
import { BiSolidDockLeft } from "react-icons/bi";
import { MdOutlineCheckCircleOutline } from "react-icons/md";
import { TbTransform } from "react-icons/tb";
import { VscError, VscFeedback, VscSourceControl, VscSync, VscSyncIgnored } from "react-icons/vsc";
import useConfig from "src/store/useConfig";
import useFile from "src/store/useFile";
import useGraph from "src/store/useGraph";
import useModal from "src/store/useModal";

const StyledBottomBar = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-top: 1px solid ${({ theme }) => theme.BACKGROUND_MODIFIER_ACCENT};
  background: ${({ theme }) => theme.TOOLBAR_BG};
  max-height: 27px;
  height: 27px;
  z-index: 35;
  padding-right: 6px;

  @media screen and (max-width: 320px) {
    display: none;
  }
`;

const StyledLeft = styled.div`
  display: flex;
  align-items: center;
  justify-content: left;
  gap: 4px;
  padding-left: 8px;

  @media screen and (max-width: 480px) {
    display: none;
  }
`;

const StyledRight = styled.div`
  display: flex;
  align-items: center;
  justify-content: right;
  gap: 4px;
`;

const StyledBottomBarItem = styled.button<{ $bg?: string }>`
  display: flex;
  align-items: center;
  gap: 4px;
  width: fit-content;
  margin: 0;
  height: 28px;
  padding: 4px;
  font-size: 12px;
  font-weight: 400;
  color: ${({ theme }) => theme.INTERACTIVE_NORMAL};
  background: ${({ $bg }) => $bg};
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;

  &:hover:not(&:disabled) {
    background-image: linear-gradient(rgba(0, 0, 0, 0.1) 0 0);
    color: ${({ theme }) => theme.INTERACTIVE_HOVER};
  }

  &:disabled {
    opacity: 0.6;
    cursor: default;
  }
`;

export const BottomBar = () => {
  const { query, replace } = useRouter();
  const data = useFile(state => state.fileData);
  const toggleLiveTransform = useConfig(state => state.toggleLiveTransform);
  const liveTransformEnabled = useConfig(state => state.liveTransformEnabled);
  const hasChanges = useFile(state => state.hasChanges);
  const error = useFile(state => state.error);
  const getContents = useFile(state => state.getContents);
  const setContents = useFile(state => state.setContents);
  const nodeCount = useGraph(state => state.nodes.length);
  const fileName = useFile(state => state.fileData?.name);
  const toggleFullscreen = useGraph(state => state.toggleFullscreen);
  const fullscreen = useGraph(state => state.fullscreen);

  const setVisible = useModal(state => state.setVisible);
  const setHasChanges = useFile(state => state.setHasChanges);
  const getFormat = useFile(state => state.getFormat);
  const [isPrivate, setIsPrivate] = React.useState(false);
  const [isUpdating, setIsUpdating] = React.useState(false);

  const toggleEditor = () => toggleFullscreen(!fullscreen);
  return (
    <StyledBottomBar>
      {data?.name && (
        <Head>
          <title>{data.name} | JSON Crack</title>
        </Head>
      )}
      <StyledLeft>
        <StyledBottomBarItem onClick={toggleEditor}>
          <BiSolidDockLeft />
        </StyledBottomBarItem>
        <StyledBottomBarItem>
          {error ? (
            <Popover width="auto" shadow="md" position="top" withArrow>
              <Popover.Target>
                <Flex align="center" gap={2}>
                  <VscError color="red" size={16} />
                  <Text c="red" fw={500} fz="xs">
                    Invalid
                  </Text>
                </Flex>
              </Popover.Target>
              <Popover.Dropdown
                style={{
                  pointerEvents: "none",
                }}
              >
                <Text size="xs">{error}</Text>
              </Popover.Dropdown>
            </Popover>
          ) : (
            <Flex align="center" gap={2}>
              <MdOutlineCheckCircleOutline />
              <Text size="xs">Valid</Text>
            </Flex>
          )}
        </StyledBottomBarItem>
        <StyledBottomBarItem
          onClick={() => setVisible("share")(true)}
          disabled={isPrivate || !data}
        >
          <AiOutlineLink />
          Share
        </StyledBottomBarItem>
        {liveTransformEnabled ? (
          <StyledBottomBarItem onClick={() => toggleLiveTransform(false)}>
            <VscSync />
            <Text fz="xs">Live Transform</Text>
          </StyledBottomBarItem>
        ) : (
          <StyledBottomBarItem onClick={() => toggleLiveTransform(true)}>
            <VscSyncIgnored />
            <Text fz="xs">Manual Transform</Text>
          </StyledBottomBarItem>
        )}
        {!liveTransformEnabled && (
          <StyledBottomBarItem onClick={() => setContents({})}>
            <TbTransform />
            Transform
          </StyledBottomBarItem>
        )}
      </StyledLeft>

      <StyledRight>
        <StyledBottomBarItem>Nodes: {nodeCount}</StyledBottomBarItem>
      </StyledRight>
    </StyledBottomBar>
  );
};
