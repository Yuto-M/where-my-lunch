import { NextResponse, type NextRequest } from 'next/server';
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

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams
  const lat = searchParams.get('lat')
  const lon = searchParams.get('lon')
  const res = await fetch(
    `http://webservice.recruit.co.jp/hotpepper/gourmet/v1/?key=${process.env.RECRUIT_WEB_SERVICE_KEY}&large_area=Z011&format=json&lat=${lat}&lng=${lon}&range=5`,
    { cache: "no-store"}
  );
  const data: res = await res.json();
  return NextResponse.json(data);
}

