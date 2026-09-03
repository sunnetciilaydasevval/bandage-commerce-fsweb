export async function getGravatarUrl(email) {
    if (!email) {
        return "";
    }

    const normalizedEmail =
        email.trim().toLowerCase();

    const encoder =
        new TextEncoder();

    const data =
        encoder.encode(normalizedEmail);

    const hashBuffer =
        await crypto.subtle.digest(
            "SHA-256",
            data
        );

    const hashArray =
        Array.from(
            new Uint8Array(hashBuffer)
        );

    const hash =
        hashArray
            .map((byte) =>
                byte
                    .toString(16)
                    .padStart(2, "0")
            )
            .join("");

    return `https://www.gravatar.com/avatar/${hash}?d=identicon&s=96`;
}
