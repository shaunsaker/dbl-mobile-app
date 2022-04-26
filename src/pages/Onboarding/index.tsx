import React, { createRef, ReactElement, useCallback, useState } from 'react';
import styled from 'styled-components/native';
import PagerView from 'react-native-pager-view';
import { CustomTouchableOpacity } from '../../components/CustomTouchableOpacity';
import CloseIcon from '../../icons/close.svg';
import { colors } from '../../theme/colors';
import { useDispatch } from 'react-redux';
import { OnboardingOne } from './OnboardingOne';
import { OnboardingTwo } from './OnboardingTwo';
import { OnboardingThree } from './OnboardingThree';
import { Page } from '../../components/Page';
import { RHYTHM } from '../../theme/rhythm';
import { updateUserProfile } from '../../store/userProfile/actions';

const SLIDES = [OnboardingOne, OnboardingTwo, OnboardingThree];

const CLOSE_ICON_SIZE = 24;

interface OnboardingProps {}

export const Onboarding = ({}: OnboardingProps): ReactElement => {
  const dispatch = useDispatch();

  const pagerViewRef = createRef<PagerView>();

  const [pageIndex, setPageIndex] = useState(0);

  const onPageSelected = useCallback(
    event => {
      setPageIndex(event.nativeEvent.position);
    },
    [setPageIndex],
  );

  const onNavigatePress = useCallback(
    (newPageIndex: number) => {
      pagerViewRef.current?.setPage(newPageIndex);
    },
    [pagerViewRef],
  );

  const markCompletedOnboarding = useCallback(() => {
    dispatch(
      updateUserProfile.request({ data: { hasCompletedOnboarding: true } }),
    );
  }, [dispatch]);

  const onSubmitPress = useCallback(
    (slideIndex: number) => {
      const isFinalSlide = slideIndex === SLIDES.length - 1;

      if (isFinalSlide) {
        markCompletedOnboarding();
      } else {
        pagerViewRef.current?.setPage(slideIndex + 1);
      }
    },
    [markCompletedOnboarding, pagerViewRef],
  );

  const onClosePress = useCallback(() => {
    markCompletedOnboarding();
  }, [markCompletedOnboarding]);

  return (
    <Page>
      <StyledPagerView ref={pagerViewRef} onPageSelected={onPageSelected}>
        {SLIDES.map((Slide, index) => (
          <Slide key={index + 1} onSubmit={() => onSubmitPress(index)} />
        ))}
      </StyledPagerView>

      <CloseButtonContainer onPress={onClosePress}>
        <CloseIcon
          width={CLOSE_ICON_SIZE}
          height={CLOSE_ICON_SIZE}
          fill={colors.primaryText}
        />
      </CloseButtonContainer>

      <DotsContainer>
        {SLIDES.map((_, index) => {
          return (
            <Dot
              key={`dot-${index}`}
              active={pageIndex === index}
              onPress={() => onNavigatePress(index)}
            />
          );
        })}
      </DotsContainer>
    </Page>
  );
};

const StyledPagerView = styled(PagerView)`
  flex: 1;
`;

const CloseButtonContainer = styled(CustomTouchableOpacity)`
  position: absolute;
  top: 0;
  right: ${RHYTHM}px;
`;

const DotsContainer = styled.View`
  flex-direction: row;
`;

const DOT_SIZE = 16;

const Dot = styled(CustomTouchableOpacity)<{ active: boolean }>`
  width: ${DOT_SIZE}px;
  height: ${DOT_SIZE}px;
  border-radius: ${DOT_SIZE / 2}px;
  background-color: ${({ active }) =>
    active ? colors.primary : colors.background};
  margin: 10px;
`;
