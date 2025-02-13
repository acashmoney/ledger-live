import React, { memo } from "react";
import { TouchableWithoutFeedback, StyleSheet } from "react-native";
import {
  useNftMetadata,
  useNftCollectionMetadata,
} from "@ledgerhq/live-common/lib/nft";
import { useRoute, RouteProp } from "@react-navigation/native";
import { ProtoNFT } from "@ledgerhq/live-common/lib/types";
import { Flex, Text } from "@ledgerhq/native-ui";
import { scrollToTop } from "../../../navigation/utils";
import NftImage from "../../../components/Nft/NftImage";

type RouteParams = RouteProp<{ params: { collection: ProtoNFT[] } }, "params">;

const NftCollectionHeaderTitle = () => {
  const { params } = useRoute<RouteParams>();
  const { collection } = params;
  const nft = collection?.[0];
  const { status: nftStatus, metadata: nftMetadata } = useNftMetadata(
    nft?.contract,
    nft?.tokenId,
    nft?.currencyId,
  );
  const { metadata: collectionMetadata } = useNftCollectionMetadata(
    nft?.contract,
    nft?.currencyId,
  );

  return (
    <TouchableWithoutFeedback onPress={scrollToTop}>
      <Flex alignItems={"center"} flexDirection={"row"} ml={7} mr={9}>
        <NftImage
          style={styles.headerImage}
          src={nftMetadata?.media}
          status={nftStatus}
        />
        <Text
          variant={"body"}
          fontWeight={"semiBold"}
          numberOfLines={1}
          ellipsizeMode={collectionMetadata?.tokenName ? "tail" : "middle"}
        >
          {collectionMetadata?.tokenName || nft?.contract}
        </Text>
      </Flex>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  headerImage: {
    borderRadius: 4,
    overflow: "hidden",
    marginRight: 12,
    width: 24,
    height: 24,
  },
});

export default memo(NftCollectionHeaderTitle);
