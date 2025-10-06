import { OwnerConfirmationEmail } from "@/email-templates/orders/owner";
import { CustomerConfirmationEmail } from "@/email-templates/orders/customer";

export default function EmailTestPage() {
  const mockItems = [
    {
      id: "616",
      name: "House Wine (Per Bottle)",
      description: "Smooth, rich house red wine",
      price: 3500,
      quantity: 1,
      category: "Beverage",
      image:
        "https://images.unsplash.com/photo-1510626176961-4b57d4fbad03?w=80",
    },
    {
      id: "557",
      name: "Mango Juice",
      description: "Freshly blended tropical mango juice",
      price: 350,
      quantity: 1,
      category: "Beverage",
      image:
        "https://images.unsplash.com/photo-1570197788417-0e82375c9371?w=80",
    },
    {
      id: "558",
      name: "Passion Juice",
      description: "Refreshing passion fruit juice",
      price: 350,
      quantity: 1,
      category: "Beverage",
      image: "https://images.unsplash.com/photo-1561047029-3000e92f7d87?w=80",
    },
  ];

  const total = mockItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 p-10 bg-gray-50 min-h-screen">
      {/* Owner Email */}
      <div className="bg-white rounded-2xl shadow p-6">
        <h2 className="text-2xl font-semibold mb-4 text-red-700">
          Owner Confirmation Email
        </h2>
        <div className="border rounded-md p-4 overflow-auto bg-gray-50">
          <OwnerConfirmationEmail
            items={mockItems}
            total={total}
            customerName="Derick Kibiwott"
            phone="0717448835"
            email="derick.kibiwott@example.com"
            orderId="1234-OR"
            paymentMethod="M-Pesa"
            pickupDate="10-10-2025"
            pickupTime="14:30"
            specialInstructions="Please include extra napkins"
          />
        </div>
      </div>

      {/* Customer Email */}
      <div className="bg-white rounded-2xl shadow p-6">
        <h2 className="text-2xl font-semibold mb-4 text-green-700">
          Customer Confirmation Email
        </h2>
        <div className="border rounded-md p-4 overflow-auto bg-gray-50">
          <CustomerConfirmationEmail
            items={mockItems}
            total={total}
            customerName="Derick Kibiwott"
            phone="0717448835"
            email="derick.kibiwott@example.com"
            orderId="ORD-12345"
            paymentMethod="M-Pesa"
            pickupDate="10-10-2025"
            pickupTime="14:30"
            specialInstructions="Please include extra napkins"
          />
        </div>
      </div>
    </div>
  );
}
