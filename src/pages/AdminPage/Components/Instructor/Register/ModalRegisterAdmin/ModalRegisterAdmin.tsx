import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
} from "@chakra-ui/react";
import { useState } from "react";
import css from "./ModalRegisterAdmin.module.scss";
import { booleanOpenState } from "./../../../../../../../src/atoms";
import { booleanAcceptState } from "./../../../../../../../src/atoms";
import { useRecoilState } from "recoil";
import { RecoilState, atom } from "recoil";
type Data = {
  id: number;
  title: string;
  author: string;
  date: string;
  introduction: string;
  isDone: boolean | null;
};

type ModalRegisterAdminProps = {
  isOpen: boolean;
  data: Data | null;
  onClose: () => void;
  handleAccept: (id: number, accept: boolean) => void;
};

const ModalRegister: React.FC<ModalRegisterAdminProps> = ({
  isOpen,
  data,
  onClose,
  handleAccept,
}) => {
  const [booleanOpen, setBooleanOpen] = useRecoilState(booleanOpenState);
  const [booleanAccept, setBooleanAccept] = useRecoilState(booleanAcceptState);
  // const [isDoneValue, setIsDone] = useRecoilState(isDone);
  // const [isDone, setIsDone] = useRecoilState(isDone);
  const [accept, setAccept] = useState(false);
  const onClickAccept = () => {
    setBooleanOpen(false);
    onClose();
    if (data) {
      handleAccept(data.id, true);
    }
  };

  const onClickRefuse = () => {
    setBooleanOpen(false);
    if (data) {
      handleAccept(data.id, false);
    }
    onClose();
  };
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>강사 신청자 : {data?.author}</ModalHeader>
        <ModalBody>
          <p className={css.p}>신청 분야 </p>
          <p> {data?.title}</p>
          <p className={css.p}>신청 날짜</p>
          <p> {data?.date}</p>
          <p className={css.p}>자기소개</p>
          <p> {data?.introduction}</p>
          <div className={css.imgContainer}>
            <img
              className={css.img}
              src="https://post-phinf.pstatic.net/MjAyMDA1MTRfODYg/MDAxNTg5MzkwNzE4MjM5.J_hN5KlOprOfznBz5RLCgJKOOrjvsDROmmBlash7mbEg.vQACCgltTtPA4Zq48YuOORBS1r_dU1v3JejS_qayngYg.JPEG/%ED%86%A0%EC%9D%B5%EC%8A%A4%ED%94%BC%ED%82%B92.jpg?type=w1200"
            />
          </div>
        </ModalBody>
        <ModalFooter>
          <Button colorScheme="blue" mr={3} onClick={onClickAccept}>
            수락
          </Button>
          <Button colorScheme="red" mr={3} onClick={onClickRefuse}>
            거부
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};
export default ModalRegister;
