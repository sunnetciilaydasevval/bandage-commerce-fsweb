const images = [
    "https://www.figma.com/api/mcp/asset/4690b698-e40c-4b4e-838a-a43030f974aa.png",
    "https://www.figma.com/api/mcp/asset/717f2f2e-5d0a-4a56-89c4-2e099c0a7322.png",
    "https://www.figma.com/api/mcp/asset/7eff7667-df02-4b89-8fee-084051912146.png",
    "https://www.figma.com/api/mcp/asset/0e1329f8-19be-4fde-b67c-384dcd319e76.png",
    "https://www.figma.com/api/mcp/asset/42f63dbc-dd5c-4032-b9b8-005f06a5af93.png",
    "https://www.figma.com/api/mcp/asset/fcddf8d1-32a7-46ea-b90f-68ad89067b0a.png",
    "https://www.figma.com/api/mcp/asset/2204c501-5748-459c-bb55-e4f989abee8d.png",
    "https://www.figma.com/api/mcp/asset/349f44f4-41c5-460e-a40a-bec4c7aafe27.png",
];

export const products = images.map((image, index) => ({
    id: index + 1,
    image,
    name: "Graphic Design",
    category: "English Department",
    previousPrice: "$16.48",
    price: "$6.48",
}));

export const clothingImages = [
    "https://www.figma.com/api/mcp/asset/86613d32-1ec2-41fd-953c-fa9d61d68350.png",
    "https://www.figma.com/api/mcp/asset/c039933d-ddaf-4df0-b977-151bc215998b.png",
    "https://www.figma.com/api/mcp/asset/55c959a6-57d7-43cb-a621-3ba60bc67943.png",
    "https://www.figma.com/api/mcp/asset/0a8c9dc6-f51e-4182-b34e-9207bf21708c.png",
    "https://www.figma.com/api/mcp/asset/d429831a-9288-4d0f-a8d4-2b84c59587c8.png",
    "https://www.figma.com/api/mcp/asset/4944c41f-7c4b-432d-8f70-04444d2a33e1.png",
    "https://www.figma.com/api/mcp/asset/9d5ee1ab-3e4b-4f0f-bdbc-734e1d7b452f.png",
];

