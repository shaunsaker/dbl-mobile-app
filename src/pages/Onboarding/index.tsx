import React, {
  createRef,
  ReactElement,
  useCallback,
  useLayoutEffect,
  useState,
} from 'react';
import styled from 'styled-components/native';
import PagerView from 'react-native-pager-view';
import { OnboardingIntro } from './OnboardingIntro';
import { OnboardingEncouragement } from './OnboardingEncouragement';
import { OnboardingBuyTickets } from './OnboardingBuyTickets';
import { CustomTouchableOpacity } from '../../components/CustomTouchableOpacity';
import CloseIcon from '../../icons/close.svg';
import { colors } from '../../theme/colors';
import { useDispatch } from 'react-redux';
import { navigate } from '../../store/navigation/actions';
import { Routes } from '../../router/models';
import { OnboardingVerification } from './OnboardingVerification';

const SLIDES = [
  OnboardingIntro,
  OnboardingEncouragement,
  OnboardingBuyTickets,
  OnboardingVerification,
];

const CLOSE_ICON_SIZE = 24;

interface OnboardingProps {}

export const Onboarding = ({}: OnboardingProps): ReactElement => {
  const dispatch = useDispatch();

  const pagerViewRef = createRef<PagerView>();

  const [pageIndex, setPageIndex] = useState(0);

  useLayoutEffect(() => {
    // disable gesture scrolling
    pagerViewRef.current?.setScrollEnabled(false);
  });

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

  const onClosePress = useCallback(() => {
    dispatch(navigate({ route: Routes.quitOnboardingModal }));
  }, [dispatch]);

  return (
    <Container>
      <StyledPagerView ref={pagerViewRef} onPageSelected={onPageSelected}>
        {SLIDES.map((Slide, index) => (
          <Slide
            key={index + 1}
            onSubmit={() => onNavigatePress(pageIndex + 1)}
          />
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
        {SLIDES.map((_, index) => (
          <Dot
            key={`dot-${index}`}
            active={pageIndex === index}
            disabled={index >= pageIndex}
            onPress={
              // only allow navigating backwards
              index < pageIndex ? () => onNavigatePress(index) : undefined
            }
          />
        ))}
      </DotsContainer>
    </Container>
  );
};

const Container = styled.View`
  flex: 1;
`;

const StyledPagerView = styled(PagerView)`
  flex: 1;
`;

const CloseButtonContainer = styled(CustomTouchableOpacity)`
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
