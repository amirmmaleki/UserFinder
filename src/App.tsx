// وارد کردن کتابخانه‌های لازم از ری‌اکت
import React, { useMemo, useState } from "react";

// تعریف نوع (Type) برای یوزر — یعنی هر یوزر شامل id و name است
type User = {
  id: number;
  name: string;
};

// فهرست ثابت ۱۰ یوزر فارسی
const USERS: User[] = [
  { id: 1, name: "علی" },
  { id: 2, name: "مهدی" },
  { id: 3, name: "سارا" },
  { id: 4, name: "زهرا" },
  { id: 5, name: "رضا" },
  { id: 6, name: "حسین" },
  { id: 7, name: "مریم" },
  { id: 8, name: "نرگس" },
  { id: 9, name: "رامین" },
  { id: 10, name: "نازی" },
];

// کامپوننت اصلی ما
export default function UserSearch(): JSX.Element {
  // state برای نگهداری متن جستجو (سرچ باکس)
  const [query, setQuery] = useState("");

  // state برای نگهداری شناسه (id) کاربرانی که انتخاب شدن
  const [selected, setSelected] = useState<number[]>([]);

  // useMemo برای فیلتر کردن کاربران هنگام تایپ در سرچ
  // اگر سرچ خالی باشه، همه‌ی یوزرها رو برمی‌گردونه
  const filtered = useMemo(() => {
    const q = query.trim();
    if (!q) return USERS; // وقتی سرچ خالیه، کل لیست رو نشون بده
    return USERS.filter((u) => u.name.includes(q)); // جستجوی ساده بر اساس نام
  }, [query]);

  // تابع برای انتخاب یا لغو انتخاب یک کاربر با کلیک
  const toggleSelect = (id: number) => {
    setSelected((prev) =>
      prev.includes(id) // اگر قبلاً انتخاب شده بود
        ? prev.filter((s) => s !== id) // از لیست حذف کن (لغو انتخاب)
        : [...prev, id] // اگر انتخاب نشده بود، اضافه‌اش کن
    );
  };

  // JSX (خروجی UI) — چیزی که در صفحه نشون داده میشه
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-6 transition-all duration-300">
      <div className="w-full max-w-2xl bg-white rounded-2xl shadow-md p-6">
        {/* عنوان اصلی */}
        <h1 className="text-2xl font-semibold mb-4 text-gray-800 text-center">
          مدیریت کاربران
        </h1>

        {/* بخش جستجو */}
        <div className="flex gap-2 mb-6">
          {/* ورودی سرچ */}
          <input
            dir="auto"
            value={query}
            onChange={(e) => setQuery(e.target.value)} // هر تغییری در ورودی، state را به‌روز می‌کند
            placeholder="نام کاربر را تایپ کن... (مثلاً: سارا)"
            className="flex-1 px-4 py-2 rounded-lg borde border-l-blackborder-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-400"
          />
          {/* دکمه پاک کردن سرچ */}
          <button
            onClick={() => setQuery("")}
            className="px-4 py-2 rounded-lg bg-indigo-600 text-white hover:bg-indigo-700"
          >
            پاک
          </button>
        </div>

        {/* لیست کاربران (بر اساس نتیجه فیلتر) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {/* اگر هیچ کاربری پیدا نشد */}
          {filtered.length === 0 ? (
            <div className="text-center col-span-full text-gray-500">
              هیچ کاربری پیدا نشد.
            </div>
          ) : (
            /* اگر کاربر وجود دارد، هرکدام را نمایش بده */
            filtered.map((user) => {
              // بررسی اینکه آیا کاربر فعلی انتخاب شده است یا نه
              const isSelected = selected.includes(user.id);

              return (
                <div
                  key={user.id}
                  onClick={() => toggleSelect(user.id)} // هنگام کلیک، وضعیت انتخاب عوض می‌شود
                  className={`cursor-pointer p-4 rounded-xl border shadow-sm transition-all duration-200 ${
                    isSelected
                      ? "bg-indigo-100 border-indigo-400" // در حالت انتخاب شده رنگ خاصی می‌گیرد
                      : "bg-white hover:bg-gray-100 border-gray-200" // در حالت عادی
                  }`}
                >
                  {/* نام کاربر */}
                  <div className="text-lg font-medium text-gray-900">{user.name}</div>
                  {/* شناسه کاربر */}
                  <div className="text-sm text-gray-500">شناسه: {user.id}</div>
                </div>
              );
            })
          )}
        </div>

        {/* نمایش کاربران انتخاب شده در پایین صفحه */}
        {selected.length > 0 && (
          <div className="mt-6 text-sm text-gray-700 text-center">
            <p>
              {selected.length} نفر انتخاب شدند:{" "}
              <span className="font-medium text-indigo-600">
                {/* نمایش نام تمام کاربران انتخاب شده */}
                {selected
                  .map((id) => USERS.find((u) => u.id === id)?.name)
                  .join("، ")}
              </span>
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
