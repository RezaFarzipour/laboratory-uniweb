import { TiHomeOutline } from "react-icons/ti";
import { CiWallet } from "react-icons/ci";
import { IoMdExit } from "react-icons/io";
import { contactInfoType, latestArticleType, sidebarData } from "@/types";
import { IoLocationOutline } from "react-icons/io5";
import { MdOutlinePhone } from "react-icons/md";
import { CiMail } from "react-icons/ci";

export const sidebarlinks: sidebarData[] = [
  {
    id: 0,
    title: "داشبورد",
    icon: TiHomeOutline,
    hover: "text-primary-500",
  },

  {
    id: 1,
    title: "سفارش های من",
    icon: CiWallet,
    hover: "text-primary-500",
  },

  {
    id: 2,
    title: "خروج",
    icon: IoMdExit,
    hover: "text-danger-500",
  },
];

export const LatestArticles: latestArticleType[] = [
  {
    id: 1,
    image: "/images/blog1-img1.png",
    publishedDate: new Date(),
    author: "محمد حیدری",
    articleTitle: "پیشرو در تجزیه و تحلیل شیمیایی",
    description:
      "حوزه تجزیه و تحلیل شیمیایی در سال های اخیر شاهد نوآوری های قابل توجهی بوده است که به دلیل پیشرفت در فناوری و روش شناسی انجام شده است",
  },
  {
    id: 2,
    image: "/images/blog1-img2.png",
    publishedDate: new Date(),
    author: "مریم زمانی",
    articleTitle: "مقررات صنعت گرایش های نوظهور",
    description:
      "با تنظیم بیشتر صنایع، تقاضا برای تجزیه و تحلیل کامل و دقیق در حال افزایش است. مقررات زیست محیطی جدید، به عنوان مثال، پروتکل آزمایش.",
  },
];

<<<<<<< HEAD
export const steps = [
  { id: 1, label: "احراز هویت" },
  { id: 2, label: "تکمیل اطلاعات" },
  { id: 3, label: "ثبت سفارش" },
];
=======
export const contactusinformation: contactInfoType[] = [
  {
    id: 1,
    title: "آدرس",
    desc: "زنجان.دانشگاه اعتمادیه",
    icon: IoLocationOutline,
  },
  {
    id: 2,
    title: "شماره تماس",
    desc: "123-456-789 ",
    icon: MdOutlinePhone,
  },
  {
    id: 1,
    title: "آدرس ایمیل",
    desc: "dr.salimi@gmail.com ",
    icon: CiMail,
  },
];
>>>>>>> e247a7c8bb776cd8e5779c248a2c87ded055f61a
