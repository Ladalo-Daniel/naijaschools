"use client"

import * as Dialog from "@radix-ui/react-dialog";
import { useRouter, useSearchParams } from "next/navigation";
import { HiOutlineTrophy } from "react-icons/hi2";

export default function QuizModal({setOpen, open}){
  // const router = useRouter()
  // const searchParams = useSearchParams()
  return (
    <Dialog.Root>
      <Dialog.Trigger className="flex flex-row items-center  gap-4 bg-lightRed shadow-lg hover:opacity-80 hover:text-white w-[90%] p-4 rounded-md text-lg text-white font-poppins cursor-pointer active:opacity-90"
        onClick={() => {
          setOpen(!open)

        }}
      //  onPress={onOpen}
        >
        <HiOutlineTrophy />
        <span>Start Quiz Now</span>
      </Dialog.Trigger>
      {
      open &&
      <Dialog.Portal forceMount={open}>
        <Dialog.Overlay className="fixed inset-0 w-full h-full bg-black opacity-40" />
        <Dialog.Content className="fixed top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] w-full max-w-lg mx-auto px-4">
          <div className="bg-white rounded-md shadow-lg">
            <div className="flex items-center justify-between p-4 border-b">
              <Dialog.Title className="text-lg font-medium text-gray-800 ">
                Terms and agreements
              </Dialog.Title>
              <Dialog.Close onClick={() => setOpen(prev => !prev)} className="p-2 text-gray-400 rounded-md hover:bg-gray-100">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-5 h-5 mx-auto"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                    clipRule="evenodd"
                  />
                </svg>
              </Dialog.Close>
            </div>
            <Dialog.Description className="space-y-2 p-4 mt-3 text-[15.5px] leading-relaxed text-gray-500">
              <p>
                Commodo eget a et dignissim dignissim morbi vitae, mi. Mi
                aliquam sit ultrices enim cursus. Leo sapien, pretium duis est
                eu volutpat interdum eu non. Odio eget nullam elit laoreet.
                Libero at felis nam at orci venenatis rutrum nunc. Etiam mattis
                ornare pellentesque iaculis enim.
              </p>
              <p>
                Felis eu non in aliquam egestas placerat. Eget maecenas ornare
                venenatis lacus nunc, sit arcu. Nam pharetra faucibus eget
                facilisis pulvinar eu sapien turpis at. Nec aliquam aliquam
                blandit eu ipsum.
              </p>
            </Dialog.Description>
            <div className="flex items-center gap-3 p-4 border-t">
              <Dialog.Close asChild>
                <button className="px-6 py-2 text-white bg-indigo-600 rounded-md outline-none ring-offset-2 ring-indigo-600 focus:ring-2 ">
                  Accept
                </button>
              </Dialog.Close>
              <Dialog.Close asChild>
                <button
                  className="px-6 py-2 text-gray-800 border rounded-md outline-none ring-offset-2 ring-indigo-600 focus:ring-2"
                  aria-label="Close"
                  onClick={() => setOpen(prev => !prev)}
                >
                  Cancel
                </button>
              </Dialog.Close>
            </div>
          </div>
        </Dialog.Content>
      </Dialog.Portal>
}
    </Dialog.Root>
  );
};


// import React from "react";
// import {Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, ModalProps, Button, useDisclosure, RadioGroup, Radio} from "@nextui-org/react";

// export default function QuizModal() {
//   const {isOpen, onOpen, onOpenChange} = useDisclosure();
// //   const [scrollBehavior, setScrollBehavior] = useState["scrollBehavior"];

//   return (
//     <div className="flex flex-col gap-2 bg-darkGreen">
//       <Button onPress={onOpen}>Open Modal</Button>
//       {/* <RadioGroup
//         label="Select scroll behavior"
//         orientation="horizontal"
//         value={scrollBehavior}
//         onValueChange={setScrollBehavior}
//       >
//         <Radio value="inside">inside</Radio>
//         <Radio value="outside">outside</Radio>
//       </RadioGroup> */}
//       <Modal
//         isOpen={isOpen}
//         onOpenChange={onOpenChange}

//         // scrollBehavior={scrollBehavior}
//       >
//         <ModalContent className=" bg-slate">
//           {(onClose) => (
//             <>
//               <ModalHeader className="flex flex-col gap-1">
//                 Modal Title
//               </ModalHeader>
//               <ModalBody>
//                 <p>
//                   Lorem ipsum dolor sit amet, consectetur adipiscing elit.
//                   Nullam pulvinar risus non risus hendrerit venenatis.
//                   Pellentesque sit amet hendrerit risus, sed porttitor quam.
//                 </p>
//                 <p>
//                   Lorem ipsum dolor sit amet, consectetur adipiscing elit.
//                   Nullam pulvinar risus non risus hendrerit venenatis.
//                   Pellentesque sit amet hendrerit risus, sed porttitor quam.
//                 </p>
//                 <p>
//                   Magna exercitation reprehenderit magna aute tempor cupidatat
//                   consequat elit dolor adipisicing. Mollit dolor eiusmod sunt ex
//                   incididunt cillum quis. Velit duis sit officia eiusmod Lorem
//                   aliqua enim laboris do dolor eiusmod. Et mollit incididunt
//                   nisi consectetur esse laborum eiusmod pariatur proident Lorem
//                   eiusmod et. Culpa deserunt nostrud ad veniam.
//                 </p>
//                 <p>
//                   Lorem ipsum dolor sit amet, consectetur adipiscing elit.
//                   Nullam pulvinar risus non risus hendrerit venenatis.
//                   Pellentesque sit amet hendrerit risus, sed porttitor quam.
//                   Magna exercitation reprehenderit magna aute tempor cupidatat
//                   consequat elit dolor adipisicing. Mollit dolor eiusmod sunt ex
//                   incididunt cillum quis. Velit duis sit officia eiusmod Lorem
//                   aliqua enim laboris do dolor eiusmod. Et mollit incididunt
//                   nisi consectetur esse laborum eiusmod pariatur proident Lorem
//                   eiusmod et. Culpa deserunt nostrud ad veniam.
//                 </p>
//                 <p>
//                   Mollit dolor eiusmod sunt ex incididunt cillum quis. Velit
//                   duis sit officia eiusmod Lorem aliqua enim laboris do dolor
//                   eiusmod. Et mollit incididunt nisi consectetur esse laborum
//                   eiusmod pariatur proident Lorem eiusmod et. Culpa deserunt
//                   nostrud ad veniam. Lorem ipsum dolor sit amet, consectetur
//                   adipiscing elit. Nullam pulvinar risus non risus hendrerit
//                   venenatis. Pellentesque sit amet hendrerit risus, sed
//                   porttitor quam. Magna exercitation reprehenderit magna aute
//                   tempor cupidatat consequat elit dolor adipisicing. Mollit
//                   dolor eiusmod sunt ex incididunt cillum quis. Velit duis sit
//                   officia eiusmod Lorem aliqua enim laboris do dolor eiusmod. Et
//                   mollit incididunt nisi consectetur esse laborum eiusmod
//                   pariatur proident Lorem eiusmod et. Culpa deserunt nostrud ad
//                   veniam.
//                 </p>
//                 <p>
//                   Lorem ipsum dolor sit amet, consectetur adipiscing elit.
//                   Nullam pulvinar risus non risus hendrerit venenatis.
//                   Pellentesque sit amet hendrerit risus, sed porttitor quam.
//                 </p>
//                 <p>
//                   Magna exercitation reprehenderit magna aute tempor cupidatat
//                   consequat elit dolor adipisicing. Mollit dolor eiusmod sunt ex
//                   incididunt cillum quis. Velit duis sit officia eiusmod Lorem
//                   aliqua enim laboris do dolor eiusmod. Et mollit incididunt
//                   nisi consectetur esse laborum eiusmod pariatur proident Lorem
//                   eiusmod et. Culpa deserunt nostrud ad veniam.
//                 </p>
//                 <p>
//                   Mollit dolor eiusmod sunt ex incididunt cillum quis. Velit
//                   duis sit officia eiusmod Lorem aliqua enim laboris do dolor
//                   eiusmod. Et mollit incididunt nisi consectetur esse laborum
//                   eiusmod pariatur proident Lorem eiusmod et. Culpa deserunt
//                   nostrud ad veniam. Lorem ipsum dolor sit amet, consectetur
//                   adipiscing elit. Nullam pulvinar risus non risus hendrerit
//                   venenatis. Pellentesque sit amet hendrerit risus, sed
//                   porttitor quam. Magna exercitation reprehenderit magna aute
//                   tempor cupidatat consequat elit dolor adipisicing. Mollit
//                   dolor eiusmod sunt ex incididunt cillum quis. Velit duis sit
//                   officia eiusmod Lorem aliqua enim laboris do dolor eiusmod. Et
//                   mollit incididunt nisi consectetur esse laborum eiusmod
//                   pariatur proident Lorem eiusmod et. Culpa deserunt nostrud ad
//                   veniam.
//                 </p>
//               </ModalBody>
//               <ModalFooter>
//                 <Button color="danger" variant="light" onPress={onClose}>
//                   Close
//                 </Button>
//                 <Button color="primary" onPress={onClose}>
//                   Action
//                 </Button>
//               </ModalFooter>
//             </>
//           )}
//         </ModalContent>
//       </Modal>
//     </div>
//   );
// }
