import React, { memo, useMemo, useState } from 'react';
import { useSelector } from 'react-redux';
import styled from 'styled-components/native';

import FinishForm from '../../components/Formik/FinishForm';
import { selectors } from '../../state';
import { renderTime } from '../../utils/helpers/timeHelpers';
import PopUp from '../../components/PopUps/SecondaryPupUp';

const FinishView = memo(() => {
  const pomodorosMin = useSelector(selectors.pomodoro.pomodorosMin);
  const shortBreakMin = useSelector(selectors.pomodoro.shortBreakMin);
  const sessions = useSelector(selectors.pomodoro.sessions);
  const finishTime = useSelector(selectors.pomodoro.finishTime);
  const [showModal, setShowModal] = useState(false);

  const formatTime = useMemo(
    () => renderTime(sessions, pomodorosMin, finishTime).time,
    [sessions, pomodorosMin, finishTime],
  );

  const postData = {
    style: pomodorosMin + '/' + shortBreakMin,
    sessions,
    time: formatTime,
  };

  return (
    <FinishContainer>
      <Results>
        <BorderRightBlock>
          <Type>Working Style</Type>
          <Value>{postData.style}</Value>
        </BorderRightBlock>
        <BorderRightBlock>
          <Type>Sessions Done</Type>
          <Value>{postData.sessions}</Value>
        </BorderRightBlock>
        <BorderBottomBlock>
          <Type>Working Time</Type>
          <Value>{formatTime}</Value>
        </BorderBottomBlock>
      </Results>
      <CustomizeBorder>
        <CustomizeText>CUSTOMIZE YOUR WORKING SESSION</CustomizeText>
      </CustomizeBorder>
      <FinishForm handlePopUp={setShowModal} postData={postData} />
      <PopUp show={showModal} handlePopUp={setShowModal} />
    </FinishContainer>
  );
});
FinishView.displayName = 'FinishView';
const CustomizeText = styled.Text`
  font-size: 15px;
  color: ${({ theme }) => theme.colors.opacity07};
  font-family: ${({ theme }) => theme.fonts.NunitoRegular};
`;
const CustomizeBorder = styled.View`
  align-items: center;
  justify-content: center;
  height: 30px;
  width: 100%;
  background-color: ${({ theme }) => theme.colors.placeholderColor};
`;

export const Value = styled.Text`
  font-size: 17px;
  color: ${({ theme }) => theme.colors.opacity07};
  font-family: ${({ theme }) => theme.fonts.MontserratBold};
`;

export const Type = styled.Text`
  font-size: 15px;
  color: ${({ theme }) => theme.colors.opacity07};
  font-family: ${({ theme }) => theme.fonts.MontserratRegular};
`;

export const BorderRightBlock = styled.View`
  flex: 1;
  height: 100%;
  justify-content: center;
  align-items: center;
  border-right-width: 1px;
  border-right-color: ${({ theme }) => theme.colors.opacity03};
  border-bottom-width: 1px;
  border-bottom-color: ${({ theme }) => theme.colors.opacity03};
`;

export const BorderBottomBlock = styled.View`
  flex: 1;
  height: 100%;
  justify-content: center;
  align-items: center;
  border-bottom-width: 1px;
  border-bottom-color: ${({ theme }) => theme.colors.opacity03};
`;

const FinishContainer = styled.View`
  flex: 1;
  background-color: ${({ theme }) => theme.colors.paleWhite};
`;
const Results = styled.View`
  height: 60px;
  width: 100%;
  flex-direction: row;
`;

export default FinishView;
