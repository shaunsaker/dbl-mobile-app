import React, { createRef, ReactElement, useCallback, useState } from 'react';
import styled from 'styled-components/native';
import PagerView from 'react-native-pager-view';
import { useDispatch } from 'react-redux';
import { OnboardingOne } from './OnboardingOne';
import { OnboardingTwo } from './OnboardingTwo';
import { OnboardingThree } from './OnboardingThree';
import { Page } from '../../components/Page';
import { CustomTouchableOpacity } from '../../components/CustomTouchableOpacity';
import { CloseButton } from '../../components/CloseButton';
import { colors } from '../../theme/colors';
import { setHasCompletedOnboarding } from '../../store/onboarding/actions';
import { BackButton } from '../../components/BackButton';
import { navigateBack } from '../../store/navigation/actions';

const SLIDES = [OnboardingOne, OnboardingTwo, OnboardingThree];

interface OnboardingProps {}

export const Onboarding = ({}: OnboardingProps): ReactElement => {
  const dispatch = useDispatch();

  const pagerViewRef = createRef<PagerView>();

  const [pageIndex, setPageIndex] = useState(0);

  const onBackPress = useCallback(() => {
    const isInitialSlide = pageIndex === 0;

    if (isInitialSlide) {
      dispatch(navigateBack());
    } else {
      pagerViewRef.current?.setPage(pageIndex - 1);
    }
  }, [dispatch, pageIndex, pagerViewRef]);

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
    dispatch(setHasCompletedOnboarding({ hasCompletedOnboarding: true }));
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

      <BackButtonContainer>
        <BackButton onPress={onBackPress} />
      </BackButtonContainer>

      <CloseButtonContainer>
        <CloseButton onPress={onClosePress} />
      </CloseButtonContainer>
    </Page>
  );
};

const StyledPagerView = styled(PagerView)`
  flex: 1;
`;

const BackButtonContainer = styled.View`
  position: absolute;
  top: 0;
  left: 0;
`;

const CloseButtonContainer = styled.View`
  position: absolute;
  top: 0;
  right: 0;
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
