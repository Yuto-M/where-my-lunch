import { NextResponse } from 'next/server';

type res = {
      id: string;
      name: string;
      address: string;
      access: string;
      photo: {
        mobile: {
          l: string;
        };
      };
    }[];

export async function GET() {
  const res = await fetch(
    `http://webservice.recruit.co.jp/hotpepper/gourmet/v1/?key=${process.env.RECRUIT_WEB_SERVICE_KEY}&large_area=Z011&format=json&lat=${process.env.LATITUDE}&lng=${process.env.LONGITUDE}&range=5`,
    { cache: "no-store"}
  );
  const data: res = await res.json();
  return NextResponse.json(data);
}

