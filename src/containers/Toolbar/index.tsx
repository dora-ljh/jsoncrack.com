import React from "react";
import { Badge, Flex, Group, Select, Text } from "@mantine/core";
import toast from "react-hot-toast";
import { AiOutlineFullscreen } from "react-icons/ai";
import { FiDownload } from "react-icons/fi";
import { SearchInput } from "src/components/SearchInput";
import { FileFormat } from "src/enums/file.enum";
import useFile from "src/store/useFile";
import useModal from "src/store/useModal";
import { FileMenu } from "./FileMenu";
import { OptionsMenu } from "./OptionsMenu";
import { ToolsMenu } from "./ToolsMenu";
import { ViewMenu } from "./ViewMenu";
import { ZoomMenu } from "./ZoomMenu";
import * as Styles from "./styles";

function fullscreenBrowser() {
  if (!document.fullscreenElement) {
    document.documentElement.requestFullscreen().catch(() => {
      toast.error("Unable to enter fullscreen mode.");
    });
  } else if (document.exitFullscreen) {
    document.exitFullscreen();
  }
}

export const Toolbar: React.FC<{ isWidget?: boolean }> = ({ isWidget = false }) => {
  const setVisible = useModal(state => state.setVisible);
  const setFormat = useFile(state => state.setFormat);
  const format = useFile(state => state.format);

  return (
    <Styles.StyledTools>
      <Group gap="xs" justify="left" w="100%" style={{ flexWrap: "nowrap" }}>

          <Select
            defaultValue="json"
            size="xs"
            value={format}
            onChange={e => setFormat(e as FileFormat)}
            miw={80}
            w={120}
            data={[
              { value: FileFormat.JSON, label: "JSON" },
              { value: FileFormat.YAML, label: "YAML" },
              { value: FileFormat.XML, label: "XML" },
              { value: FileFormat.TOML, label: "TOML" },
              { value: FileFormat.CSV, label: "CSV" },
            ]}
            allowDeselect={false}
          />

          <FileMenu />
          <ViewMenu />
          <ToolsMenu />
        </Group>
      <Group gap="xs" justify="right" w="100%" style={{ flexWrap: "nowrap" }}>

        <SearchInput />
        <>
            <Styles.StyledToolElement
              title="Save as Image"
              onClick={() => setVisible("download")(true)}
            >
              <FiDownload size="18" />
            </Styles.StyledToolElement>
            <ZoomMenu />
            <OptionsMenu />
            <Styles.StyledToolElement
              title="Fullscreen"
              $hide={isWidget}
              onClick={fullscreenBrowser}
            >
              <AiOutlineFullscreen size="18" />
            </Styles.StyledToolElement>
          </>
      </Group>
    </Styles.StyledTools>
  );
};
