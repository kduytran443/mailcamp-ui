import axios, { AxiosResponse, InternalAxiosRequestConfig } from "axios";
import { SimpleClassDTO } from "models/SimpleClassDTO";

const fakeData: SimpleClassDTO[] = [
  {
    id: "1",
    image: "https://via.placeholder.com/150/92c952",
    name: "accusamus beatae ad facilis cum similique qui sunt",
    shortDescription: "Khóa học giúp bạn hiểu về lập trình cơ bản."
  },
  {
    id: "2",
    image: "https://via.placeholder.com/150/771796",
    name: "reprehenderit est deserunt velit ipsam",
    shortDescription: "Khám phá các kỹ thuật nâng cao trong lập trình."
  },
  {
    id: "3",
    image: "https://via.placeholder.com/150/24f355",
    name: "officia porro iure quia iusto qui ipsa ut modi",
    shortDescription: "Khóa học về phát triển phần mềm từ A-Z."
  },
  {
    id: "4",
    image: "https://via.placeholder.com/150/d32776",
    name: "culpa odio esse rerum omnis laboriosam voluptate repudiandae",
    shortDescription: "Học cách xây dựng ứng dụng web chuyên nghiệp."
  },
  {
    id: "5",
    image: "https://via.placeholder.com/150/f66b97",
    name: "natus nisi omnis corporis facere molestiae rerum in",
    shortDescription: "Tìm hiểu về thuật toán và cấu trúc dữ liệu."
  },
  {
    id: "6",
    image: "https://via.placeholder.com/150/56a8c2",
    name: "accusamus ea aliquid et amet sequi nemo",
    shortDescription: "Cơ bản về trí tuệ nhân tạo và machine learning."
  },
  {
    id: "7",
    image: "https://via.placeholder.com/150/b0f7cc",
    name: "officia delectus consequatur vero aut veniam explicabo molestias",
    shortDescription: "Học lập trình di động từ cơ bản đến nâng cao."
  },
  {
    id: "8",
    image: "https://via.placeholder.com/150/54176f",
    name: "aut porro officiis laborum odit ea laudantium corporis",
    shortDescription: "Khóa học phát triển game Unity 3D."
  },
  {
    id: "9",
    image: "https://via.placeholder.com/150/51aa97",
    name: "qui eius qui autem sed",
    shortDescription: "Hiểu rõ cách hoạt động của hệ điều hành."
  },
  {
    id: "10",
    image: "https://via.placeholder.com/150/810b14",
    name: "beatae et provident et ut vel",
    shortDescription: "Phân tích dữ liệu với Python và SQL."
  },
  {
    id: "11",
    image: "https://via.placeholder.com/150/1ee8a4",
    name: "nihil at amet non hic quia qui",
    shortDescription: "Nhập môn lập trình với JavaScript."
  },
  {
    id: "12",
    image: "https://via.placeholder.com/150/66b7d2",
    name: "mollitia soluta ut rerum eos aliquam consequatur perspiciatis maiores",
    shortDescription: "Chứng chỉ AWS cho người mới bắt đầu."
  }
];

const getSimpleClasses = async () => {
  await new Promise((resolve) => setTimeout(resolve, 3000));
  return {
    data: fakeData,
    status: 200,
    statusText: "OK",
    headers: {},
    config: {}
  } as AxiosResponse<SimpleClassDTO[]>;
};

export { getSimpleClasses };
