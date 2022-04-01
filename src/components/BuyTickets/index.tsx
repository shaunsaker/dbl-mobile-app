import React, { ReactElement, useCallback, useState } from 'react';
import Collapsible from 'react-native-collapsible';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components/native';
import { Routes } from '../../router/models';
import { navigate } from '../../store/navigation/actions';
import { selectPreferredUserWallet } from '../../store/userProfile/selectors';
import { numberToDigits } from '../../utils/numberToDigits';
import { CustomTouchableOpacity } from '../CustomTouchableOpacity';
import { PrimaryButton } from '../PrimaryButton';
import { Typography } from '../Typography';
import EditIcon from '../../icons/edit.svg';
import CopyIcon from '../../icons/copy.svg';
import { colors } from '../../theme/colors';
import Clipboard from '@react-native-community/clipboard';
import { showSnackbar } from '../../store/snackbars/actions';
import { SnackbarType } from '../../store/snackbars/models';
import { selectActiveLot } from '../../store/lots/selectors';
import { reserveTickets } from '../../store/lots/actions';

const EDIT_ICON_SIZE = 24;
const COPY_ICON_SIZE = 24;

// TODO: SS this may need some work
const getTicketOdds = ({
  userTickets,
  lotTickets,
}: {
  userTickets: number;
  lotTickets: number;
}): string => {
  if (!userTickets) {
    return 'No';
  }

  return `1 in ${numberToDigits(lotTickets / userTickets)}`;
};

interface BuyTicketProps {
  instructionsCollapsed?: boolean; // during onboarding we want the instructions to be expanded by default
  onSubmit: () => void;
}

// TODO: SS create a copy component (we'll likely use it elsewhere)
export const BuyTickets = ({
  instructionsCollapsed,
  onSubmit,
}: BuyTicketProps): ReactElement => {
  const dispatch = useDispatch();

  const [tickets, setTickets] = useState(0);

  const [_instructionsCollapsed, setInstructionsCollapsed] = useState(
    instructionsCollapsed,
  );

  const activeLot = useSelector(selectActiveLot);
  const pricePerTicketBTC = activeLot ? activeLot.ticketPriceInBTC : 0;
  const pricePerTicketUSD = activeLot
    ? numberToDigits(activeLot.ticketPriceInBTC * activeLot.BTCPriceInUSD)
    : 0;
  const BTCToSend = numberToDigits(pricePerTicketBTC * tickets, 6);

  // limit the amount of tickets a user can purchase
  const ticketLimitReached =
    tickets === activeLot?.perUserTicketLimit ||
    tickets === activeLot?.ticketsLeft;

  const preferredUserWallet = useSelector(selectPreferredUserWallet);
  const preferredUserWalletAddress =
    preferredUserWallet && preferredUserWallet.address;

  const onToggleInstructions = useCallback(() => {
    setInstructionsCollapsed(!_instructionsCollapsed);
  }, [_instructionsCollapsed, setInstructionsCollapsed]);

  const onClearTicketsPress = useCallback(() => {
    setTickets(0);
  }, [setTickets]);

  const onAddTickets = useCallback(
    (ticketsToAdd: number) => {
      if (!activeLot) {
        return;
      }

      let newTickets = tickets + ticketsToAdd;

      // limit ticket purchases to the ticketsLeft
      if (newTickets > activeLot.ticketsLeft) {
        newTickets = activeLot.ticketsLeft;
      }

      // or perUserTicketLimit
      if (newTickets > activeLot.perUserTicketLimit) {
        newTickets = activeLot.perUserTicketLimit;
      }

      setTickets(newTickets);
    },
    [tickets, setTickets, activeLot],
  );

  const onAddWalletPress = useCallback(() => {
    dispatch(
      navigate({
        route: Routes.editWalletModal,
        props: {
          walletId: undefined, // we want to add a new wallet
        },
      }),
    );
  }, [dispatch]);

  const onEditWalletAddressPress = useCallback(() => {
    dispatch(
      navigate({
        route: Routes.editWalletModal,
        props: {
          walletId: preferredUserWallet.id,
        },
      }),
    );
  }, [dispatch, preferredUserWallet]);

  const copyLotAddressPress = useCallback(() => {
    if (!activeLot) {
      // TODO: SS show an error
      return;
    }

    Clipboard.setString(activeLot.walletAddress);

    dispatch(
      showSnackbar({
        type: SnackbarType.success,
        title: 'Copied to your clipboard',
        description: activeLot.walletAddress,
      }),
    );
  }, [activeLot, dispatch]);

  const onSubmitPress = useCallback(() => {
    if (!activeLot) {
      // TODO: SS show an error
      return;
    }

    dispatch(
      reserveTickets.request({
        lotId: activeLot.id,
        ticketCount: tickets,
        userWalletId: preferredUserWallet.id,
      }),
    );

    onSubmit();
  }, [dispatch, activeLot, tickets, preferredUserWallet, onSubmit]);

  if (!activeLot) {
    return (
      <Container>
        <Typography>
          Well this is embarrasing, we have no active lots 🤔
        </Typography>
      </Container>
    );
  }

  return (
    <Container>
      <Typography>Buy Tickets</Typography>

      <CustomTouchableOpacity onPress={onToggleInstructions}>
        <Typography bold>How does this work?</Typography>
      </CustomTouchableOpacity>

      <Collapsible collapsed={_instructionsCollapsed}>
        <Typography>
          1. For the price of lunch, you can own your golden ticket(s) to glory
        </Typography>

        <Typography>2. Send BTC to the value of the ticket(s)</Typography>

        <Typography>
          3. Add an external wallet address so that we know that it's you that
          has sent us the BTC (you only need to do this once)
        </Typography>

        <Typography>
          4. Once the transction is verified, we'll add your ticket(s) to the
          lot*
        </Typography>

        <Typography>
          5. We'll do the draw at 23h59 tonight and at 00h00, the winner will be
          announced
        </Typography>

        <Typography small>
          *We understand that BTC transfer times can vary so don't worry if your
          BTC does not arrive by draw time, we'll add your ticket(s) to the next
          lot :)
        </Typography>
      </Collapsible>

      <Typography>Tickets I'm Buying: {tickets}</Typography>

      {ticketLimitReached && (
        <Typography small>Maximum ticket limit reached</Typography>
      )}

      <Typography>
        Price per ticket: ${pricePerTicketBTC} BTC (${pricePerTicketUSD})
      </Typography>

      <Typography>
        {getTicketOdds({
          userTickets: tickets,
          lotTickets: activeLot.ticketCount,
        })}{' '}
        chance to become a Millionaire
      </Typography>

      <Typography bold>
        BTC to send: {BTCToSend} BTC ($
        {numberToDigits(pricePerTicketUSD * tickets)})
      </Typography>

      <StyledPrimaryButton small secondary onPress={onClearTicketsPress}>
        Clear tickets
      </StyledPrimaryButton>

      <Typography>Buy More</Typography>

      <StyledPrimaryButton
        small
        secondary
        disabled={ticketLimitReached}
        onPress={() => onAddTickets(1)}
      >
        +1
      </StyledPrimaryButton>

      <StyledPrimaryButton
        small
        secondary
        disabled={ticketLimitReached}
        onPress={() => onAddTickets(10)}
      >
        +10
      </StyledPrimaryButton>

      <StyledPrimaryButton
        small
        secondary
        disabled={ticketLimitReached}
        onPress={() => onAddTickets(100)}
      >
        +100
      </StyledPrimaryButton>

      {preferredUserWalletAddress ? (
        <>
          <Typography>
            We're expecting BTC from the wallet address you added:{' '}
            {preferredUserWalletAddress}
          </Typography>

          <StyledEditButton onPress={onEditWalletAddressPress}>
            <EditIcon
              width={EDIT_ICON_SIZE}
              height={EDIT_ICON_SIZE}
              fill={colors.primaryText}
            />
          </StyledEditButton>
        </>
      ) : (
        <StyledPrimaryButton
          disabled={!tickets}
          small
          secondary
          onPress={onAddWalletPress}
        >
          Add External Wallet Address
        </StyledPrimaryButton>
      )}

      {preferredUserWalletAddress && (
        <>
          <Typography>
            Send ${BTCToSend} BTC to this lot's wallet address:{' '}
            {activeLot.walletAddress}
          </Typography>

          <StyledCopyButton onPress={copyLotAddressPress}>
            <CopyIcon
              width={COPY_ICON_SIZE}
              height={COPY_ICON_SIZE}
              fill={colors.primaryText}
            />
          </StyledCopyButton>
        </>
      )}

      <PrimaryButton
        disabled={!tickets || !preferredUserWalletAddress}
        onPress={onSubmitPress}
      >
        I've sent my BTC
      </PrimaryButton>
    </Container>
  );
};

const Container = styled.View``;

const StyledPrimaryButton = styled(PrimaryButton)`
  align-self: flex-start;
`;

const StyledEditButton = styled(CustomTouchableOpacity)``;

const StyledCopyButton = styled(CustomTouchableOpacity)``;
