import { faker } from "@faker-js/faker";
import { SimpleClassDTO } from "models/SimpleClassDTO";

export const mockClasses: SimpleClassDTO[] = Array.from({ length: 12 }, (_, index) => ({
  id: faker.string.uuid(),
  image: faker.image.urlLoremFlickr({ category: "education" }),
  name: faker.lorem.words(3),
  shortDescription: faker.lorem.sentence(),
}));
