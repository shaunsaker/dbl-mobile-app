import React, { ReactElement } from 'react';
import { ImageSourcePropType } from 'react-native';
import styled from 'styled-components/native';
import { PrimaryButton } from './PrimaryButton';
import { Typography } from './Typography';

interface BlankStateProps {
  imageSource: ImageSourcePropType;
  title: string;
  description: string;
  buttonText?: string;
  buttonAccessibilityLabel?: string;
  onPress?: () => void;
}

export const BlankState = ({
  imageSource,
  title,
  description,
  buttonText,
  buttonAccessibilityLabel,
  onPress,
}: BlankStateProps): ReactElement => {
  return (
    <Container>
      <Image source={imageSource} />

      <Typography large bold>
        {title}
      </Typography>

      <Typography center>{description}</Typography>

      {buttonText && onPress && (
        <>
          <PrimaryButton
            accessibilityLabel={buttonAccessibilityLabel}
            onPress={onPress}
          >
            {buttonText}
          </PrimaryButton>
        </>
      )}
    </Container>
  );
};

const Container = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
`;

const Image = styled.Image``;
