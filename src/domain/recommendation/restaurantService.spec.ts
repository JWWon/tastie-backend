import { RestaurantService } from '.';
import { TestingModule, Test } from '@nestjs/testing';
import { RecommendationModule } from '@/module/recommendationModule';
import { ConfigModule } from '@nestjs/config';
import { Category } from '@/entities';

describe('UnitTest of RestaurantService', () => {
  let restaurantService: RestaurantService;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      imports: [
        RecommendationModule,
        ConfigModule.forRoot({
          isGlobal: true,
        }),
      ],
    }).compile();

    restaurantService = app.get<RestaurantService>(RestaurantService);
  });

  describe('getCategories', () => {
    type TestCase = {
      readonly description: string;
      readonly argUTCNow: string;
      readonly expected: Category[];
    };

    const testCases: TestCase[] = [
      {
        description: 'When 05AM',
        argUTCNow: '2018-11-21T20:00:01.000Z',
        expected: [{ name: '아침' }],
      },
      {
        description: 'When 10AM',
        argUTCNow: '2018-11-21T01:00:01.000Z',
        expected: [{ name: '아침' }, { name: '브런치' }],
      },
      {
        description: 'When 11AM',
        argUTCNow: '2018-11-21T02:00:01.000Z',
        expected: [{ name: '브런치' }, { name: '점심' }],
      },
      {
        description: 'When 13PM',
        argUTCNow: '2018-11-21T04:00:01.000Z',
        expected: [{ name: '점심' }, { name: '디저트' }],
      },
      {
        description: 'When 15PM',
        argUTCNow: '2018-11-21T06:00:01.000Z',
        expected: [{ name: '디저트' }],
      },
      {
        description: 'When 17PM',
        argUTCNow: '2018-11-21T08:00:01.000Z',
        expected: [{ name: '저녁' }, { name: '디저트' }],
      },
      {
        description: 'When 19PM',
        argUTCNow: '2018-11-21T10:00:01.000Z',
        expected: [{ name: '저녁' }, { name: '술자리' }, { name: '디저트' }],
      },
      {
        description: 'When 1AM',
        argUTCNow: '2018-11-21T16:00:01.000Z',
        expected: [{ name: '야식' }, { name: '술자리' }],
      },
      {
        description: 'When 21PM',
        argUTCNow: '2018-11-21T12:00:01.000Z',
        expected: [{ name: '술자리' }, { name: '야식' }, { name: '저녁' }],
      },
    ];

    for (const tc of testCases) {
      it(tc.description, async () => {
        const actual = await restaurantService.getCategories({
          utcNow: new Date(tc.argUTCNow),
        });

        actual.sort((a, b) => (a.name < b.name ? 1 : -1));
        tc.expected.sort((a, b) => (a.name < b.name ? 1 : -1));

        expect(actual).toEqual(tc.expected);
      });
    }
  });
});
