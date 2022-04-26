import React, { ReactElement, useCallback, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components/native';
import { InputContainer } from '../../../components/InputContainer';
import { PrimaryButton } from '../../../components/PrimaryButton';
import { TextInput } from '../../../components/TextInput';
import { Typography } from '../../../components/Typography';
import { LotId } from '../../../store/lots/models';
import { ApplicationState } from '../../../store/reducers';
import { updateUserProfile } from '../../../store/userProfile/actions';
import {
  selectUserProfileDataLoading,
  selectUserTestimonialByLotId,
  selectUserTestimonials,
} from '../../../store/userProfile/selectors';
import { getTimeAsISOString } from '../../../utils/getTimeAsISOString';

interface TestimonialInputProps {
  lotId: LotId;
}

export const TestimonialInput = ({
  lotId,
}: TestimonialInputProps): ReactElement => {
  const dispatch = useDispatch();

  const userTestimonials = useSelector(selectUserTestimonials);
  const userTestimonial = useSelector((state: ApplicationState) =>
    selectUserTestimonialByLotId(state, lotId),
  );
  const loading = useSelector(selectUserProfileDataLoading);

  const [testimonial, setTestimonial] = useState(
    userTestimonial?.testimonial || '',
  );

  const isSubmitDisabled = loading || !testimonial;

  const onChangeTestimonial = useCallback((text: string) => {
    setTestimonial(text);
  }, []);

  const onSubmitTestimonial = useCallback(() => {
    const existingTestimonial =
      (userTestimonials && userTestimonials[lotId]) || {};
    const newTestimonials = {
      ...userTestimonials,
      [lotId]: {
        ...existingTestimonial,
        dateCreated: getTimeAsISOString(),
        testimonial,
      },
    };

    dispatch(
      updateUserProfile.request({
        data: { testimonials: newTestimonials },
        showSnackbar: true,
      }),
    );
  }, [dispatch, userTestimonials, lotId, testimonial]);

  return (
    <InputContainer>
      <Container>
        <Typography>
          Would you mind writing a short testimonial to let other's know that
          we're legit?
        </Typography>

        <Typography small>
          *We'll only use your username to display this testimonial
        </Typography>

        <TextInput
          label="Add a short testimonial"
          placeholder="This is the bomb diggity!"
          value={testimonial}
          onChangeText={onChangeTestimonial}
          onSubmitEditing={!isSubmitDisabled ? onSubmitTestimonial : undefined}
        />

        <PrimaryButton
          disabled={isSubmitDisabled}
          loading={loading}
          onPress={onSubmitTestimonial}
        >
          SUBMIT TESTIMONIAL
        </PrimaryButton>
      </Container>
    </InputContainer>
  );
};

const Container = styled.View``;
