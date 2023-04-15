-- 1. Category
CREATE TABLE Category(
    cId     INT             AUTO_INCREMENT      PRIMARY KEY,
    name    VARCHAR(255)    NOT NULL    UNIQUE
);

-- 2. Product
CREATE TABLE Product(
    pId             INT      AUTO_INCREMENT      PRIMARY KEY,
    name            VARCHAR(255)    NOT NULL,
    price           INT             NOT NULL    CHECK (price > 0),
    description     VARCHAR(1000)   NOT NULL,
    image           VARCHAR(512)    NOT NULL    UNIQUE,
    categoryId      INT,
    CONSTRAINT  fk_product_category_id  FOREIGN KEY (categoryId)
                REFERENCES  Category(cId)
                ON DELETE SET NULL
);

-- 3. Account
CREATE TABLE Account(
    aId         INT     AUTO_INCREMENT    PRIMARY  KEY,
    username    VARCHAR(30)    NOT NULL     UNIQUE,
    password    VARCHAR(255)    NOT NULL,
    level       INT(1)         NOT NULL     CHECK (level >=1 and level <= 2),
    name        VARCHAR(255)   NOT NULL,
    dateOfBirth DATE,         
    urlAvatar   VARCHAR(255),
    phoneNumber VARCHAR(255)   NOT NULL,
    email       VARCHAR(255),
    address     VARCHAR(255)
);

-- 4. Rating
CREATE TABLE Rating(
    rId     INT     AUTO_INCREMENT      PRIMARY KEY,
    comment VARCHAR(1000),
    start   INT(1)  NOT NULL    CHECK (start >=1 and start <= 5),
    aId     INT,
    pId     INT,
    CONSTRAINT  fk_rating_account_aId  FOREIGN KEY (aId)
                REFERENCES  Account(aId)
                ON DELETE SET NULL,
    CONSTRAINT  fk_rating_product_pId  FOREIGN KEY (pId)
                REFERENCES  Product(pId)
                ON DELETE CASCADE
);

-- 5. StatusOrder
CREATE TABLE StatusOrder(
    sId     INT     AUTO_INCREMENT      PRIMARY KEY,
    name    VARCHAR(255)    NOT NULL    UNIQUE
);

-- 6. Ordering
CREATE TABLE Ordering(
    oId		    CHAR(16)	PRIMARY KEY,
    time        DATETIME       NOT NULL,
    address     VARCHAR(255)   NOT NULL,
    phoneNumber VARCHAR(255)   NOT NULL,
    statusId    INT,
    CONSTRAINT  fk_Ordering_Status_sId  FOREIGN KEY (statusId)
                REFERENCES  StatusOrder(sId)
                ON DELETE SET NULL
);
-- Rang buoc cho oId của bang Ordering
CREATE TABLE S(
    _no INT AUTO_INCREMENT PRIMARY KEY
);

DELIMITER $$
CREATE TRIGGER before_Ordering_insert
BEFORE INSERT
ON Ordering FOR EACH ROW
BEGIN
	declare maxi int;
	insert into S value (NULL);
	select max(_no) from S into maxi;
    SET NEW.oId = CONCAT('BK', LPAD(DAY(CURRENT_DATE()), 2, '0'), 
									  LPAD(MONTH(CURRENT_DATE()), 2, '0'), 
									  YEAR(CURRENT_DATE()), 
                                      LPAD(maxi, 6, '0'));
END $$
DELIMITER ;
-- -------------------------------------------

-- 7. OrderProduct
CREATE TABLE OrderProduct(
    oId     CHAR(16),
    pId     INT,
    count   INT     NOT NULL,
    PRIMARY KEY     (oId, pId),
    CONSTRAINT  fk_oProduct_Ordering_oId   FOREIGN KEY (oId) 
                REFERENCES Ordering(oId)
                ON DELETE CASCADE,
    CONSTRAINT  fk_oProduct_Product_pId   FOREIGN KEY (pId) 
                REFERENCES Product(pId)
                ON DELETE CASCADE
);

-- 8. orderAccount
CREATE TABLE orderAccount(
    oId     CHAR(16)    PRIMARY KEY,
    aId     INT,
    CONSTRAINT  fk_oAccount_Ordering_oId   FOREIGN KEY (oId) 
                REFERENCES Ordering(oId)
                ON DELETE CASCADE,
    CONSTRAINT  fk_oAccount_Account_aId   FOREIGN KEY (aId) 
                REFERENCES Account(aId)
                ON DELETE SET NULL
);

-- 9. Cart
CREATE TABLE Cart(
    accountId   INT,
    productId   INT,
    count       INT,
    PRIMARY KEY     (accountId, productId),
    CONSTRAINT  fk_Cart_Account_oId   FOREIGN KEY (accountId) 
                REFERENCES Account(aId)
                ON DELETE CASCADE,
    CONSTRAINT  fk_Cart_Product_pId   FOREIGN KEY (productId) 
                REFERENCES Product(pId)
                ON DELETE CASCADE
);

-- INSERT
-- 1. Category
INSERT INTO Category VALUES ('1','Beverages');
INSERT INTO Category VALUES ('2','Potato');
INSERT INTO Category VALUES ('3','Chicken');
INSERT INTO Category VALUES ('4','Burgers');
INSERT INTO Category VALUES ('5','Salads');

-- 2. Product
INSERT INTO Product VALUES ('','Cocacola Bottle','20000','Thức uống mát lạnh để giải khát','coca1.png','1');
INSERT INTO Product VALUES ('','Cocacola','15000','Thức uống mát lạnh để giải khát','coca2.png','1');
INSERT INTO Product VALUES ('','Lemon Juice','25000','Nước chanh tươi mát','lemon.png','1');

INSERT INTO Product VALUES ('','Potato big','20000','Khoai tây chiên giòn rụm','potato.png','2');
INSERT INTO Product VALUES ('','Potato small','14000','Khoai tây chiên giòn rụm','potato3.png','2');
INSERT INTO Product VALUES ('','Chicken McNuggets','35000','Gà chiên trong dai ngoài giòn','chicken (2).png','3');

INSERT INTO Product VALUES ('','Big Mac Burger','40000','Burger siêu đặc biệt ăn không no không tính tiền','buger5.png','4');
INSERT INTO Product VALUES ('','Potato slices','14000','Khoai tây cắt lát chiên giòn tan','potato2.png','2');
INSERT INTO Product VALUES ('','Combo Chicken','50000','Combo gà đặc biệt với nhiều món cho bạn bữa ăn thật no và ngon','chicken.png','3');

INSERT INTO Product VALUES ('','Big Burger','30000','Burger lớn nhiều thịt nhiều rau','burger.png','4');
INSERT INTO Product VALUES ('','Mac Burger','35000','Burger đặc biệt nhiều thịt nhiều rau','burger1.png','4');
INSERT INTO Product VALUES ('','Medium Mac Burger','30000','Burger đặc biệt loại nhỏ','burger2.png','4');

INSERT INTO Product VALUES ('','Mashed Potato','30000','Khoai tây nghiền, ăn là ghiền','potato4.png','2');
INSERT INTO Product VALUES ('','Chicken Small','28000','Gà chiên loại nhỏ, lớp vỏ giòn rụm','chicken2.png','3');
INSERT INTO Product VALUES ('','Chicken Big Max','100000','Combo gà chiên cho nhiều người ăn','chicken4.png','3');

INSERT INTO Product VALUES ('','Salat 1','20000','Salat ăn kèm nhiều chất xơ, chống ngán hiệu quả','salat1.png','5');
INSERT INTO Product VALUES ('','Salat 2','23000','Salat ăn kèm nhiều chất xơ, chống ngán hiệu quả','salat2.png','5');
INSERT INTO Product VALUES ('','Pepsi','16000','Pepsi mát lạnh, sảng khoái','pepsi1.png','1');

INSERT INTO Product VALUES ('','Salat 3','25000','Salat ăn kèm nhiều chất xơ, chống ngán hiệu quả','salat3.png','5');
INSERT INTO Product VALUES ('','Salat 4','24000','Salat ăn kèm nhiều chất xơ, chống ngán hiệu quả','salat4.png','5');
INSERT INTO Product VALUES ('','Sprite','16000','Sprite mát lạnh thơm nồng vị chanh','sprite2.png','1');

INSERT INTO Product VALUES ('','Chicken Medium','70000','Gà chiên trong dai ngoài giòn','chicken 8.png','3');
INSERT INTO Product VALUES ('','Sprite Bottle','20000','Sprite mát lạnh thơm nồng vị chanh','sprite1.png','1');
INSERT INTO Product VALUES ('','Pepsi Bottle','20000','Pepsi mát lạnh, sảng khoái','pepsi2.png','1');

INSERT INTO Product VALUES ('','Orange Juice','25000','Nước cam ép đến từ thiên nhiên, không phẩm màu không chất bảo quản','orange.png','1');

-- 3. Account
INSERT INTO Account VALUES ('1','laptrinhweb','565008d1f6f712771b27eee29afc8899','2','admin', '1999-5-6', 'https://tenten.vn/tin-tuc/wp-content/uploads/2022/09/2-6.png','0362704387','admin123@gmail.com','Ký túc xá khu A đại học Quốc gia TP.HCM'); -- mk là bk123
INSERT INTO Account VALUES ('2','customer','e10adc3949ba59abbe56e057f20f883e','1','Nguyễn Văn Tân', '2001-8-9', 'https://afamilycdn.com/150157425591193600/2022/8/25/img2760-166143316409263801587.jpg','0362704387','tan@gmail.com','Ký túc xá khu A đại học Quốc gia TP.HCM'); -- mk là 123456

-- 4. Rating
INSERT INTO Rating VALUES (1,'Sản phẩm thật tuyệt vời', '5', 2, 6);
INSERT INTO Rating VALUES (2,'Nước chanh rất ngon', '4', 2, 4);

-- 5. StatusOrder
INSERT INTO StatusOrder VALUES(1,'Waiting');
INSERT INTO StatusOrder VALUES(2,'Confirmed');
INSERT INTO StatusOrder VALUES(3,'Cancel');

-- 6. Ordering, 7, 8
INSERT INTO Ordering VALUES ('','2023-4-14 09:28:25','Ký túc xá khu B Đại học quốc gia TP.HCM','0934897659',1);
SELECT 
    @oId:=MAX(oId)
FROM
    ordering;

INSERT INTO orderproduct VALUES (@oId, 2, 1);
INSERT INTO orderproduct VALUES (@oId, 3, 2);
INSERT INTO orderproduct VALUES (@oId, 10, 1);

INSERT INTO orderAccount VALUES (@oId, 2);


INSERT INTO Ordering VALUES ('','2023-4-14 09:20:37','26 Trường Chinh, thành phố Pleiku, tỉnh Gia Lai','0134892371',2);
SELECT 
    @oId:=MAX(oId)
FROM
    ordering;

INSERT INTO orderproduct VALUES (@oId, 6, 1);
INSERT INTO orderproduct VALUES (@oId, 9, 5);

INSERT INTO orderAccount VALUES (@oId, 2);


INSERT INTO Ordering VALUES ('','2023-4-14 09:20:37','58 Lê Lai, Ba Đình, Hà Nội','01648785758',3);
SELECT 
    @oId:=MAX(oId)
FROM
    ordering;

INSERT INTO orderproduct VALUES (@oId, 20, 1);

INSERT INTO orderAccount VALUES (@oId, NULL);

-- 7. OrderProduct
-- INSERT INTO OrderProduct VALUES ('BK14042023000001', 2, 1);
-- INSERT INTO OrderProduct VALUES ('BK14042023000001', 3, 2);
-- INSERT INTO OrderProduct VALUES ('BK14042023000001', 10, 1);

-- INSERT INTO OrderProduct VALUES ('BK14042023000002', 6, 1);
-- INSERT INTO OrderProduct VALUES ('BK14042023000002', 9, 5);

-- INSERT INTO OrderProduct VALUES ('BK14042023000003', 20, 1);

-- 8. orderAccount
-- INSERT INTO orderAccount VALUES ('BK14042023000001', 2);
-- INSERT INTO orderAccount VALUES ('BK14042023000002', 2);
-- INSERT INTO orderAccount VALUES ('BK14042023000003', NULL);
