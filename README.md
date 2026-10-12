# Đuổi chỗ bắt team — Zalopay Tech (Zone B)

Mini App dạng trò chơi: người chơi chọn một **chỗ ngồi** trên sơ đồ Zone B, nhân
vật **chạy tới** nơi đó, rồi **đoán xem đó là team nào** (4 đáp án + mô tả chức
năng). Đoán đúng sẽ **gặp mặt head/lead** của team.

Được dựng bằng bộ skill **non-payment-builder-skills** (ZaloPay Mini App Builder)
theo kiến trúc DAP + Module Federation chuẩn của Zalopay Mini App.

---

## 1. Xem nhanh (không cần cài gì)

| File | Nội dung |
|---|---|
| [`duoi-cho-bat-team-review.html`](duoi-cho-bat-team-review.html) | **Bản chơi thử** — mở bằng trình duyệt là chơi được ngay. |
| [`duoi-cho-bat-team-demo.mp4`](duoi-cho-bat-team-demo.mp4) | Video quay lại một lượt chơi (~27s). |
| [`screenshots/`](screenshots/) | Ảnh từng màn hình (intro → map → quiz → gợi ý → kết quả → tổng kết). |

> Mở review HTML: double-click file, hoặc chạy `python3 -m http.server` rồi vào
> `http://localhost:8000/duoi-cho-bat-team-review.html`.

## 2. Luật chơi

1. Chạm vào **một khu chỗ ngồi** → nhân vật chạy tới đó.
2. Đoán **team nào** trong 4 đáp án (kèm **mô tả chức năng** làm gợi ý).
3. Bí thì dùng tối đa **2 gợi ý**: ① hiện domain, ② loại 2 đáp án sai (50/50).
   Mỗi gợi ý làm giảm điểm (100 → 70 → 40).
4. **Chỉ khi đoán đúng** mới lộ đáp án và hiện **head/lead** của team. Đoán sai
   thì chỗ đó vẫn ẩn để **người chơi khác chơi tiếp** (phù hợp booth nhiều người).
5. Bắt đủ 16 team → màn **tổng kết** (điểm, độ chính xác, chuỗi dài nhất).

## 3. Mô hình phòng ban → team

Mỗi **phòng ban** (PFT, PCP, PMT, PGE, PCT, ACC, PTO, PSE, PTech, PDP) là một
**phòng** trên bản đồ; bên trong là các **bàn = team** của phòng ban đó. Người
chơi chạm vào **một bàn** và đoán **team** nào (4 đáp án — ưu tiên các team cùng
phòng ban làm đáp án nhiễu). Đoán xong hiện tên team + phòng ban + head/lead.

Hiện có **10 phòng ban · 21 team**:

| Phòng ban | Teams |
|---|---|
| PFT | Bank, Cashier, MMF, Lending |
| PCP | Payment Core, UM, Operation Platform |
| PCT | OTA, Money transfer, Home + Platform |
| PGE | CRM, Marketing Solutions |
| PMT | Merchant Solutions, Billing Solutions |
| PDP | Data Platform |
| PTech | AI Enablement, Data science |
| PSE | Zalopay security |
| PTO | SRE, 247 |
| ACC | Accounting |

### Cách thay / cập nhật dữ liệu

Tất cả nằm trong **một file duy nhất** (và khối `DEPARTMENTS` tương ứng trong
`duoi-cho-bat-team-review.html`):

- Source thật: [`src/dataSource/game/zone-b.data.ts`](src/dataSource/game/zone-b.data.ts)

```ts
{
  code: 'PMT',                 // mã phòng ban (header của phòng)
  name: 'Payment Merchant…',   // tên đầy đủ phòng ban
  domain: 'Sản phẩm',          // dùng cho gợi ý & câu nhiễu
  func: 'Giải pháp merchant…', // mô tả chức năng (gợi ý)
  lead: {
    name: '',                  // '' → avatar demo; điền tên head/lead thật vào đây
    title: 'Head of PMT',
    photoUrl: '',              // '' → avatar demo; dán URL ảnh thật vào đây
  },
  teams: ['Merchant Solutions', 'Billing Solutions'],  // các team trong phòng ban
}
```

> Thêm/bớt team chỉ cần sửa mảng `teams`; bản đồ tự chia lại số bàn trong phòng.

> Vị trí các khu nằm ở mảng `ZONES` (toạ độ đã vẽ **đúng theo ảnh sơ đồ Zone B
> thật** — một team có thể có nhiều khu, ví dụ PCF/PCP); chỉ sửa khi layout ghế đổi.

## 3b. Phong cách thiết kế

UI áp dụng phương pháp **ui-ux-pro-max**: hướng **Tactile / Clay** (bề mặt mềm,
bo tròn, bóng đổ nhiều lớp, nút nhấn nảy theo lò xo), typography **Nunito +
DM Sans** — giữ nguyên bộ màu thương hiệu Zalopay (xanh dương #0033c9 + xanh lá
#00cf6a). Nhân vật là **linh vật Toro** của Zalopay (mèo xanh, mũ lá xanh, mắt
to đeo kính, găng trắng) — chạy tới ô team được chọn.

Bản đồ là **sơ đồ chỗ ngồi thật** của Zone B — các khu ở **đúng vị trí** như sơ
đồ, mỗi khu là **lưới ghế dày** (số lượng ghế ≈ sơ đồ gốc), gom theo team. Đây
là điểm cốt lõi của "đuổi **chỗ** bắt team": phải dựa vào **vị trí** để xác định
team. **Không hiển thị tên phòng ban/team trên bản đồ** — bạn đoán hoàn toàn theo
vị trí; dùng các landmark (WAREHOUSE, MEETING ROOMS, PANTRY) và khu lân cận
(ZOP, OPCS, PCF…) để định vị. Ô đã bắt chỉ hiện **dấu ✓**.

**HRPY (HR)** cũng là một khu chơi được → tổng **22 team / 11 phòng ban**.

**Câu hỏi không nêu tên phòng ban** (chỉ hỏi "chỗ này của team nào?"). **Gợi ý**:
① hiện **lĩnh vực** của team (không lộ phòng ban), ② loại bớt 2 đáp án (50/50).

Nhân vật là linh vật đơn giản (đầu xanh dương + thân xanh lá) chạy tới ghế được chọn.

**Nằm ngang mặc định (landscape-first):** để bản đồ to & rõ nhất, app luôn chạy
**ngang** — header là thanh bên trái, bản đồ chiếm trọn bề rộng. Khi mở trên
**điện thoại cầm dọc**, app **tự xoay 90°** để lấp đầy màn hình ở chế độ ngang.

**Bảng câu hỏi & kết quả** hiện dưới dạng **thẻ nổi ở góc trên-trái** của bản đồ,
**không che/tối bản đồ** — người chơi vẫn thấy nhân vật chạy tới chỗ ngồi khi đoán.

**Mỗi màn hình = 1 lượt chơi liên tục (booth nhiều người):** tiến độ (điểm, team
đã bắt, chuỗi) được **lưu theo từng màn hình** (localStorage). Bấm **Bắt đầu** chỉ
*tiếp tục* lượt đang chơi — **không reset**; tải lại trang vẫn giữ nguyên tiến độ.
Chỉ nút **Chơi lại** (màn tổng kết) mới xoá để bắt đầu lượt mới.

## 4. Build & deploy thật (môi trường Zalopay)

Dự án theo blueprint chuẩn, cần **registry nội bộ `@zpi`** (Verdaccio) để cài
`@zpi/micro-app-cli`, `@zpi/looknfeel`, `@zpi/federation-adapter`…

```bash
npm install            # cần cấu hình registry @zpi nội bộ
npm run lint
npm run test:unit      # chạy unit test (scoring / build-quiz / reducer / repository)
npm run wp-build       # tạo bundle Module Federation + remoteEntry.js
```

Sau đó dùng skill `zalopay-miniapp-build` (tạo review HTML / bundle) và
`zalopay-deploy-sandbox` để chuẩn bị bản sandbox.

## 5. Kiến trúc (DAP)

```
src/
  dataSource/game/      # dữ liệu + fetcher (local/external) + repository
  application/game/     # logic thuần: scoring, build-quiz, reducer, use-game hook
  presentation/
    page/GamePage       # màn chính (SCSS Modules, scoped — không reset host)
    component/game/     # SeatingMap (SVG), QuizSheet, ResultCard, Overlays
  share/game/           # tiện ích hiển thị (avatar, màu)
```

Chiều phụ thuộc: `presentation → application → dataSource` (+ `share`).
UI không gọi trực tiếp native bridge; không import chéo layer.

## 6. Trạng thái kiểm thử

- ✅ Logic lõi đã verify (23/23 assertion: điểm, gợi ý, luật "sai không lộ đáp án").
- ✅ Cấu trúc project qua `build-miniapp.mjs validate` → `ok`.
- ✅ Bản review HTML đã chạy thử trên trình duyệt (xem `screenshots/` + video).
- ⚠️ Chưa chạy `npm install` / `wp-build` tại đây do thiếu registry `@zpi` nội bộ.

---

*Dữ liệu team & head/lead hiện là nội dung minh họa (demo). Vui lòng cập nhật
tên, ảnh và mô tả thật trước khi phát hành.*
