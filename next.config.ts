import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  
  images: {
    domains: ['encrypted-tbn0.gstatic.com','encrypted-tbn0.gstatic.com','images.nationalgeographic.org','encrypted-tbn0.gstatic.com','m.economictimes.com','upload.wikimedia.org','media.wired.com','static.vecteezy.com','static6.depositphotos.com','www.strokecommunityalliance.org','www.researchgate.net','www.verywellhealth.com'],
  },
  async redirects() {
    return [
      {
        source: '/images',
        destination: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS7VQ6l8_w1Pr4nTAcI33vjKymVnoJVumCveg&sis',
        permanent: true,
      },
      {
        source: '/images',
        destination: 'https://m.economictimes.com/thumb/msid-94484534,width-1200,height-1200,resizemode-4,imgsize-63250/what-is-a-storm-surge-all-you-need-to-know-about-its-causes-and-impact.jpg',
        permanent: true,
      },
      {
        source: '/images',
        destination: 'https://upload.wikimedia.org/wikipedia/commons/d/d2/Katrina-new-orleans-flooding3-2005.jpg',
        permanent: true,
      },
      {
        source: '/images',
        destination: 'https://images.nationalgeographic.org/image/upload/t_edhub_resource_related_resources/v1638882727/EducationHub/photos/hurricane-pummeling-building.jpg',
        permanent: true,
      },
      {
        source: '/images',
        destination: 'https://media.wired.com/photos/5af0d136c59ba151c77c2948/1:1/w_1800,h_1800,c_limit/tornado.jpg',
        permanent: true,
      },
      {
        source: '/images',
        destination: 'https://static.vecteezy.com/system/resources/previews/039/613/145/non_2x/global-economy-growth-concept-illustration-vector.jpg',
        permanent: true,
      },
      {
        source: '/images',
        destination: 'https://static6.depositphotos.com/1029473/605/i/450/depositphotos_6058501-stock-photo-environment-concept.jpg',
        permanent: true,
      },
      {
        source: '/images',
        destination: 'https://www.strokecommunityalliance.org/wp-content/uploads/go-x/u/b597120c-21ba-41c8-9ff2-8caca5d0d254/l68,t0,w476,h476/image.jpg',
        permanent: true,
      },
      {
        source: '/images',
        destination: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQfTTUdyu-5XEddJa5Flnt8Ri7ZTyGCnrgS6w&s',
        permanent: true,
      },
      {
        source: '/images',
        destination: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQVrzPY12hV0HtCZ1N9-zczdpjLKn_SfiGd7g&s',
        permanent: true,
      },
      {
        source: '/images',
        destination: 'https://www.verywellhealth.com/thmb/77HJGrZqmvNoDUo8RlgjUoBdHIE=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/GettyImages-136811314-5b5d393346e0fb00506237d3.jpg',
        permanent: true,
      },
    ];
  },
};

