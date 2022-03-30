import { useRoute } from '@react-navigation/native';
import React, { ReactElement } from 'react';
import { useCallback } from 'react';
import { useDispatch } from 'react-redux';
import styled from 'styled-components/native';
import { Routes } from '../../router/models';
import { navigate } from '../../store/navigation/actions';
import { colors } from '../../theme/colors';
import { RHYTHM } from '../../theme/rhythm';
import { CustomTouchableOpacity } from '../CustomTouchableOpacity';
import { Typography } from '../Typography';

export const TAB_BAR_BUTTON_LABEL = 'tab bar button';

export interface Tab {
  label: string;
  route: Routes;
  enabled: boolean;
}

export type Tabs = Tab[];

interface TabBarProps {
  tabs: Tabs;
}

export const TabBar = ({ tabs }: TabBarProps): ReactElement => {
  const dispatch = useDispatch();
  const route = useRoute();

  const onTabPress = useCallback(
    (tab: Tab) => {
      dispatch(navigate({ route: tab.route }));
    },
    [dispatch],
  );

  return (
    <Container>
      {tabs
        .filter(tab => tab.enabled)
        .map(tab => {
          const isActiveTab = route.name.includes(tab.route); // include partial matches for nested navigators

          return (
            <TabContainer
              accessibilityLabel={TAB_BAR_BUTTON_LABEL}
              key={tab.label}
              disabled={isActiveTab}
              onPress={() => onTabPress(tab)}
            >
              <Typography bold={isActiveTab} small>
                {tab.label}
              </Typography>
            </TabContainer>
          );
        })}
    </Container>
  );
};

const Container = styled.View`
  flex-direction: row;
  border-top-width: 1px;
  border-bottom-width: 1px;
  border-color: ${colors.border};
  background-color: ${colors.white};
`;

const TabContainer = styled(CustomTouchableOpacity)`
  flex: 1;
  padding: ${RHYTHM}px ${RHYTHM / 2}px;
  justify-content: center;
  align-items: center;
`;
