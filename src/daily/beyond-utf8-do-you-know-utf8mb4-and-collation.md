---
date: 2023-08-15
tag:
- Daily
- Video
- MySQL
---

# Beyond UTF-8, do you know utf8mb4 and utf8mb4_unicode_ci?
## Background
Look at the DDL below, can you tell the meaning of `CHARSET=utf8mb4` and `COLLATE=utf8mb4_general_ci`?
```sql
CREATE TABLE `my_table` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
```

That is the knowledge that today I want to share with you.

<!-- more -->

<BiliBili bvid="BV1Rp4y1g7Uw" />

## utf8mb4(UTF-8 MultiByte 4-Byte)
UTF-8 was initially designed to support characters from the Unicode standard, which includes characters from various writing systems used across different languages. 

And the original UTF-8 encoding was Basic Multilingual Plane (BMP), which is a specific range of Unicode code points from U+0000 to U+FFFF, including a total of 65,536 code points, using 1 to 3 bytes.

However, as the Unicode standard expanded to include more characters beyond the BMP, there arose a need for a new encoding to accommodate these additional characters. This is where utf8mb4 comes into play.

The key differences between utf8 and utf8mb4 are:

1. **Character Range:** utf8mb4 supports the entire Unicode character range, while utf8 is limited to the BMP.
2. **Number of Bytes:** utf8 characters can be stored using 1 to 3 bytes, while utf8mb4 characters can use up to 4 bytes.

In practical terms, if you want to store or display characters beyond the BMP (e.g., emojis) in your MySQL database, you need to use the utf8mb4 character set. 
## utf8mb4_unicode_ci
This is about Collation.

Collation determines the mechanism of string comparisons, specifically regarding sorting and searching. 

Let's take **utf8mb4_unicode_ci **and** utf8mb4_general_ci **for examples. Since **ci** stands for case-insensitive, both of them ignore differences in lettercase. 

And their main differences are:

1. **utf8mb4_unicode_ci**:
   - This collation provides a more comprehensive and accurate comparison algorithm based on the Unicode standard.
   - It is generally more suitable when dealing with multilingual applications or when precise sorting and comparisons are required.
2. **utf8mb4_general_ci**:
   - This collation is generally faster for sorting and comparisons.
   - Its comparison algorithm would also ignore differences in certain character variations (such as accents or diacritics).
   - However, it may not produce accurate results when dealing with some complex language-specific sorting and comparison rules, because it might treat accented characters as identical to their unaccented counterparts.

And here're some examples of Accented Characters in Latin-based Languages:

- á (acute accent) - Unaccented: a
- ä (umlaut/diaeresis) - Unaccented: a

As a general recommendation, **utf8mb4_unicode_ci** is often considered a better default choice, especially in applications with internationalization (i18n) requirements. It provides more accurate sorting and comparison results for a wide range of languages and characters. 
However, there may be some specific use cases where **utf8mb4_general_ci** is preferred, such as when performance is a critical concern and language-specific sorting rules are not essential.
## Some tips
You can use the following command to check default collation for your MySQL database:
```sql
SHOW VARIABLES LIKE 'collation_database';
```

You may encounter this error Illegal mix of collations:
```bash
select id from my_table where tenant_id=@target_tenant_id;

Illegal mix of collations (utf8mb4_unicode_ci,IMPLICIT) 
and (utf8mb4_general_ci,IMPLICIT) for operation '='
```
and here's the solution, using the keyword **COLLATE**:
```sql
SET @target_tenant_id := 'your_value' COLLATE utf8mb4_unicode_ci;
```

