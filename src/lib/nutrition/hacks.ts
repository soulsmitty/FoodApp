export interface FoodHack {
  storage: string[];
  preservation: string[];
  warnings: string[];
  ripening?: string[];
  proTips: string[];
  shelfLife: { roomTemp?: string; fridge?: string; freezer?: string };
  idealTemp?: string;
}

export const FOOD_HACKS: Record<string, FoodHack> = {
  avocado: {
    storage: [
      'Store whole unripe avocados at room temperature until ripe',
      'Once ripe, refrigerate immediately — extends life 3–5 days',
      'Cut avocado: press plastic wrap directly onto the flesh (no air gaps), refrigerate',
      'Keep the pit in the unused half to slow oxidation',
    ],
    preservation: [
      'Brush cut surface with lemon or lime juice before storing',
      'Freeze mashed avocado with 1 tsp lemon juice per cup — lasts 3 months',
      'Vacuum-seal halves before freezing for best texture',
    ],
    warnings: [
      'NEVER store avocados submerged in water — confirmed Listeria contamination risk (FDA warning)',
      'Do not refrigerate unripe avocados — cold halts ripening permanently',
      'Avoid airtight containers at room temp — accelerates mold',
    ],
    ripening: [
      'Paper bag + banana or apple: releases ethylene gas, ripens in 1–2 days',
      'Emergency oven method: wrap in foil, bake at 200°F for 10–15 min (texture changes slightly)',
    ],
    proTips: [
      'Buy unripe avocados in bulk and stagger refrigeration timing',
      'A black, slightly soft avocado is peak ripeness — firm = underripe, mushy = overripe',
    ],
    shelfLife: { roomTemp: '3–5 days (unripe)', fridge: '5–7 days (ripe)', freezer: '3 months (mashed)' },
    idealTemp: '35–40°F (ripe, refrigerator)',
  },

  banana: {
    storage: [
      'Store at room temperature away from direct sunlight',
      'Hang on a banana hanger to prevent bruising on contact surfaces',
      'Separate bananas from the bunch — slows ripening slightly',
      'Wrap the crown (stem end) in plastic wrap to block ethylene release',
    ],
    preservation: [
      'Freeze peeled ripe bananas whole — perfect for smoothies, lasts 3 months',
      'Refrigerate ripe bananas: skin blackens but flesh stays good for 5+ days',
      'Slice and freeze on a sheet pan first, then bag to prevent clumping',
    ],
    warnings: [
      'Never refrigerate unripe bananas — cold destroys the ripening enzymes',
      'Keep away from other ethylene-sensitive produce (avocados, apples) if you want them to last longer',
    ],
    ripening: [
      'Place in a paper bag with an apple for faster ripening (24–48h)',
      'Oven ripen: 300°F for 15–20 min with skin on — perfect for baking',
    ],
    proTips: [
      'Black-spotted bananas have 3x the antioxidants of yellow bananas and are ideal for athletes',
      'Frozen bananas blend into a creamy ice cream texture with no added ingredients',
    ],
    shelfLife: { roomTemp: '5–7 days', fridge: '5 days (ripe, skin blackens)', freezer: '3 months' },
  },

  cilantro: {
    storage: [
      'Trim stems, place in a glass with 1 inch of water (like flowers), cover loosely with a bag, refrigerate',
      'Change the water every 2 days',
      'Alternatively: wrap in barely damp paper towel, place in zip-lock with a small air pocket',
    ],
    preservation: [
      'Freeze: blend with olive oil, pour into ice cube trays — lasts 6 months',
      'Dry in a low oven (170°F) or dehydrator for 2–4 hours for dried cilantro',
    ],
    warnings: [
      'Do NOT store in a sealed bag with no airflow — moisture trapped = slime in 2 days',
      'Avoid washing before storing — excess moisture accelerates decay',
    ],
    proTips: [
      'The stems are more flavorful than the leaves — don\'t discard them',
      'If wilted, revive by placing stems in ice water for 15 minutes',
      'Water-glass method extends life from 3 days to 2–3 weeks',
    ],
    shelfLife: { roomTemp: '1–2 days', fridge: '2–3 weeks (water glass method)', freezer: '6 months (oil cubes)' },
  },

  spinach: {
    storage: [
      'Store in original bag if unopened — the micro-perforations are designed for optimal airflow',
      'Opened: line a container with paper towels, add spinach, top with another paper towel, seal',
      'Keep in the coldest part of the fridge, not the crisper (too humid)',
    ],
    preservation: [
      'Blanch for 2 min, shock in ice water, squeeze dry, freeze in portions — lasts 3 months',
      'Do not freeze raw spinach — it becomes mushy (blanching preserves texture)',
    ],
    warnings: [
      'Rinse only before eating, not before storing — moisture kills it within days',
      'Avoid storing near ethylene-producing fruits (bananas, apples)',
    ],
    proTips: [
      'Paper towel trick doubles shelf life by absorbing excess moisture',
      'Slightly wilted spinach is still perfect for cooked dishes — don\'t toss it',
    ],
    shelfLife: { roomTemp: 'Hours', fridge: '5–7 days (paper towel method)', freezer: '3 months (blanched)' },
  },

  broccoli: {
    storage: [
      'Store unwashed in an open or loosely sealed bag in the crisper drawer',
      'Stand in a glass with 1 inch of water like a bouquet (lasts 5+ days this way)',
      'Keep dry — moisture on florets = yellow and mushy fast',
    ],
    preservation: [
      'Blanch 3 min, ice bath, dry completely, freeze — lasts 12 months with no quality loss',
    ],
    warnings: [
      'Don\'t seal airtight — broccoli needs to breathe or it yellows rapidly',
      'Yellow broccoli is still safe to eat but bitter — use in soups',
    ],
    proTips: [
      'Stems are nutrient-dense — peel the tough outer layer and eat raw or roast',
      'Chop and let sit 40 min before cooking to maximize sulforaphane activation',
    ],
    shelfLife: { roomTemp: '1–2 days', fridge: '5–7 days', freezer: '12 months (blanched)' },
  },

  eggs: {
    storage: [
      'Store in the coldest part of the fridge (back of middle shelf), not in the door',
      'Keep in original carton — it blocks odor absorption and retains moisture',
      'Store pointy end down to keep yolk centered and air cell stable',
    ],
    preservation: [
      'Freeze: crack, beat, pour into ice cube trays (2 tbsp = 1 egg). Add pinch of salt for savory, sugar for sweet. Lasts 12 months',
      'Hard-boiled in shell: refrigerate up to 1 week. Peeled: submerge in cold water, change daily, lasts 5 days',
    ],
    warnings: [
      'Never wash before storing — removes the protective bloom coating',
      'Do not freeze whole eggs in shell — they expand and crack',
      'Discard cracked eggs — bacterial entry risk',
    ],
    proTips: [
      'Float test: fresh eggs sink flat, older (still good) eggs tilt up, bad eggs float',
      'Room-temperature eggs beat to greater volume — pull from fridge 30 min before baking',
    ],
    shelfLife: { roomTemp: '2 hours max (food safety)', fridge: '3–5 weeks', freezer: '12 months (beaten)' },
  },

  chicken: {
    storage: [
      'Refrigerate immediately — never leave at room temp more than 2 hours',
      'Store in original packaging or wrap tightly — place on bottom shelf to prevent drip contamination',
      'Place on a plate or in a container to catch any leaks',
    ],
    preservation: [
      'Freeze raw in portions wrapped in plastic + foil, or vacuum-sealed — lasts 9 months',
      'Marinate before freezing — thaws ready to cook and improves texture',
      'Cooked chicken: cool completely, store in airtight container, lasts 4 days',
    ],
    warnings: [
      'NEVER thaw on the counter — bacteria multiply in the 40–140°F danger zone',
      'Thaw in the fridge (overnight), cold water bath (change water every 30 min), or microwave (cook immediately after)',
      'Pink juice ≠ undercooked — safe internal temp is 165°F regardless of color',
    ],
    proTips: [
      'Brine in saltwater (1 tbsp salt per cup water, 1–4h) for juicier results every time',
      'Freeze in single layers on a sheet pan first, then bag — prevents clumping',
    ],
    shelfLife: { roomTemp: '2 hours max', fridge: '1–2 days (raw), 4 days (cooked)', freezer: '9 months (raw)' },
  },

  salmon: {
    storage: [
      'Store on ice in the fridge: place fillets in a zip-lock bag on a bed of ice in a bowl',
      'Change the ice daily',
      'Consume within 1–2 days of purchase for peak quality',
    ],
    preservation: [
      'Freeze raw: vacuum-seal or double-wrap in plastic + foil, lasts 3 months with minimal quality loss',
      'Cure with salt + sugar + dill for gravlax — lasts 5 days and concentrates flavor',
      'Smoked salmon (commercial): unopened lasts 2–3 weeks refrigerated',
    ],
    warnings: [
      'Never refreeze thawed raw fish — texture becomes watery and mushy',
      'Wild salmon has lower freezer tolerance than farmed — consume within 2 months frozen',
    ],
    proTips: [
      'Pat dry before cooking — surface moisture prevents searing (steaming instead)',
      'Omega-3 content is highest in wild-caught sockeye or king salmon',
      'Skin side down first in a cold pan — prevents curling and renders fat beautifully',
    ],
    shelfLife: { roomTemp: '2 hours max', fridge: '1–2 days', freezer: '3 months' },
    idealTemp: '28–32°F (just above freezing is ideal for fish)',
  },

  beef: {
    storage: [
      'Store on the bottom shelf of the fridge — prevents cross-contamination from drips',
      'Keep in original packaging for short storage; rewrap in butcher paper for 1–2 days longer life',
      'Ground beef: use within 1–2 days or freeze immediately',
    ],
    preservation: [
      'Vacuum-sealed freezing gives the longest freezer life with zero freezer burn',
      'Portion and freeze flat in zip-lock bags — thaws faster and stores more efficiently',
      'Dry-age in fridge: place on a rack uncovered for 3–7 days — concentrates flavor (whole cuts only)',
    ],
    warnings: [
      'Brown color on ground beef doesn\'t mean spoiled — it\'s oxidation. Smell test is more reliable',
      'Never thaw at room temperature — 2-hour rule strictly applies',
    ],
    proTips: [
      'Salt steaks 45 min before cooking (not 5–10 min) — shorter salting draws moisture out without reabsorption',
      'Reverse sear: oven at 250°F until 10°F below target temp, then hard sear — perfect edge-to-edge doneness',
    ],
    shelfLife: { roomTemp: '2 hours max', fridge: '3–5 days (whole cuts), 1–2 days (ground)', freezer: '4–12 months' },
  },

  garlic: {
    storage: [
      'Store whole heads at room temperature in a mesh bag or open basket with airflow',
      'Peeled cloves: refrigerate in an airtight jar, lasts 1 week',
      'Minced garlic in oil: refrigerate and use within 3–4 days (BOTULISM RISK if left longer)',
    ],
    preservation: [
      'Freeze peeled cloves whole — grate directly from frozen while cooking',
      'Freeze minced in olive oil ice cube trays — lasts 3 months',
      'Pickle in vinegar — lasts months in the fridge and mellows the flavor',
    ],
    warnings: [
      'CRITICAL: Garlic stored in oil at room temperature is a botulism risk — always refrigerate and use within 3–4 days',
      'Do not store in sealed plastic bags at room temp — moisture = mold',
    ],
    proTips: [
      'Sprouted garlic is still safe to eat — just remove the green shoot (bitter)',
      'Roast a whole head in foil at 400°F for 40 min — spreadable, sweet, and stores in fridge for 2 weeks',
    ],
    shelfLife: { roomTemp: '3–6 months (whole head)', fridge: '1 week (peeled), 3–4 days (minced in oil)', freezer: '3 months' },
  },

  ginger: {
    storage: [
      'Store unpeeled at room temperature for up to 1 week',
      'Refrigerate unpeeled in a zip-lock with the air squeezed out — lasts 1 month',
      'Peeled: submerge in vodka or dry sherry in a sealed jar in the fridge',
    ],
    preservation: [
      'Freeze whole unpeeled root — grate directly from frozen (skin and all), lasts 6 months',
      'Peel, slice, and freeze in single layers — lasts 3 months',
    ],
    proTips: [
      'Use a spoon to peel ginger — gets into crevices better than a peeler and wastes less',
      'Frozen ginger grates far more easily than fresh — a pro kitchen trick',
      'Ginger stored in alcohol (vodka/sherry) keeps indefinitely in the fridge',
    ],
    warnings: [
      'Moldy ginger (blue/green fuzz): discard — mold penetrates deeper than visible',
    ],
    shelfLife: { roomTemp: '1 week', fridge: '1 month (unpeeled)', freezer: '6 months' },
  },

  tomato: {
    storage: [
      'Store NEVER in the refrigerator — cold destroys the volatile compounds responsible for flavor',
      'Keep at room temperature stem-side down on the counter',
      'Store in a single layer out of direct sunlight',
    ],
    preservation: [
      'Overripe tomatoes: roast with olive oil + garlic, freeze in portions — perfect for sauces',
      'Freeze whole: place on a sheet pan, freeze solid, bag. Skin slips off when thawed',
      'Sun-dry or oven-dry (170°F, 8–10h) to concentrate flavor and extend life dramatically',
    ],
    warnings: [
      'Refrigeration is the #1 tomato mistake — it causes starch conversion and flavor loss within 24 hours',
      'Exception: cut tomatoes must be refrigerated and used within 2 days',
    ],
    proTips: [
      'A tomato left stem-side down loses moisture more slowly (the stem scar is porous)',
      'To quickly ripen: place near bananas. To slow ripening: move away from all fruit',
    ],
    shelfLife: { roomTemp: '5–7 days (ripe)', fridge: 'Only for cut tomatoes (2 days)', freezer: '3 months (best for cooking)' },
  },

  berries: {
    storage: [
      'Do NOT wash before storing — moisture is the enemy',
      'Vinegar wash to extend life: soak in 1 part white vinegar + 3 parts water for 1 min, rinse, dry thoroughly, refrigerate',
      'Store in a single layer on paper towels in a vented container',
    ],
    preservation: [
      'Freeze unwashed: spread on a sheet pan, freeze solid, bag. Lasts 12 months with full nutrient retention',
    ],
    warnings: [
      'Never store in sealed containers — berries need airflow or they mold within days',
      'One moldy berry contaminates neighbors — check and remove immediately',
    ],
    proTips: [
      'Vinegar bath is clinically shown to reduce mold spore count by 90%+ and doubles shelf life',
      'Slightly overripe berries: blend into smoothie packs and freeze immediately',
    ],
    shelfLife: { fridge: '3–5 days (unwashed), 7–10 days (vinegar washed)', freezer: '12 months' },
  },

  mushrooms: {
    storage: [
      'Store in original paper bag or a paper bag — paper absorbs moisture and allows breathing',
      'Refrigerate in the main compartment, not the crisper (too humid)',
      'Never store in plastic bags — traps moisture and causes sliminess within days',
    ],
    preservation: [
      'Sauté in butter until all moisture evaporates, cool, freeze in portions — lasts 3 months, superior texture to raw frozen',
      'Dry: slice thinly, dehydrate at 125°F until leathery (6–8h), store in airtight jar — lasts 12 months',
    ],
    warnings: [
      'Slimy mushrooms are past safe consumption — discard',
      'Plastic bag storage is the #1 mushroom mistake',
    ],
    proTips: [
      'Wipe with a damp cloth to clean — do NOT wash under water (they absorb it like a sponge and won\'t sear properly)',
      'Dried mushrooms have 10x the umami intensity of fresh — rehydrate in warm water and use the liquid too',
    ],
    shelfLife: { roomTemp: '1–2 days', fridge: '7–10 days (paper bag)', freezer: '3 months (sautéed)' },
  },

  lemon: {
    storage: [
      'Whole lemons: room temperature for up to 1 week, or refrigerate for 3–4 weeks',
      'Cut lemons: wrap cut side in plastic wrap, refrigerate, use within 3 days',
      'Store in a zip-lock bag in the fridge to prevent drying out',
    ],
    preservation: [
      'Freeze juice in ice cube trays (1 tbsp per cube) — lasts 6 months',
      'Freeze zest in a small bag — grate directly from frozen',
      'Preserved lemons (salt-cured): quarter, pack in salt in a jar, ready in 4 weeks, lasts 1 year',
    ],
    warnings: [
      'Do not store cut citrus at room temperature — oxidizes rapidly and attracts bacteria',
    ],
    proTips: [
      'Microwave for 15 seconds before juicing — yields 50% more juice',
      'Roll firmly on the counter before cutting — breaks internal membranes for more juice',
      'Zest before juicing, always — can\'t zest a juiced lemon',
    ],
    shelfLife: { roomTemp: '1 week', fridge: '3–4 weeks', freezer: '6 months (juice/zest)' },
  },

  onion: {
    storage: [
      'Store whole in a cool, dark, dry place with good ventilation (mesh bag is ideal)',
      'Keep away from potatoes — they release gases that spoil each other',
      'Never store in sealed plastic bags — traps moisture and causes rot',
    ],
    preservation: [
      'Caramelize a large batch, freeze in tablespoon-sized portions — cooking gold on demand',
      'Dice, freeze on a sheet pan, bag — use directly from frozen in cooked dishes',
    ],
    warnings: [
      'Refrigerate cut onions in an airtight container — use within 7–10 days',
      'Do NOT store near potatoes, apples, or pears',
      'Sprouted onions are safe to eat — just remove the sprout (bitter)',
    ],
    proTips: [
      'Soak sliced raw onion in cold water for 10 min to remove harshness for raw use',
      'Store half an onion cut-side down on a plate in the fridge — lasts longer than in a bag',
    ],
    shelfLife: { roomTemp: '2–3 months (whole)', fridge: '7–10 days (cut)', freezer: '6–8 months (diced, uncooked)' },
  },

  sweetpotato: {
    storage: [
      'Store in a cool (55–60°F), dark, well-ventilated spot — NOT the refrigerator',
      'A paper bag or cardboard box in a pantry is ideal',
      'Keep away from onions — the gases they produce hasten ripening in each other',
    ],
    preservation: [
      'Roast, mash, and freeze in portions — lasts 6 months, reheats perfectly',
      'Blanch cubes 3 min, freeze on sheet pan, bag — lasts 12 months',
    ],
    warnings: [
      'NEVER refrigerate raw sweet potatoes — cold converts starches and creates an off flavor and hard core',
      'A hard white or black interior is rot — discard',
    ],
    proTips: [
      'Cure freshly harvested sweet potatoes: 85°F + high humidity for 10 days — converts starches to sugar and heals skin',
      'Softer spots are safe — the flesh is still good. Mold is not',
    ],
    shelfLife: { roomTemp: '3–5 weeks (cool dark place)', fridge: 'Avoid (cooked only, 5 days)', freezer: '6–12 months (cooked)' },
  },

  apple: {
    storage: [
      'Refrigerate in the crisper drawer for maximum longevity',
      'Store in a perforated plastic bag to maintain humidity',
      'Keep away from other produce — apples are heavy ethylene producers',
    ],
    preservation: [
      'Slice, toss in lemon juice, freeze on a sheet pan, bag — lasts 8 months',
      'Apple sauce: cook down and freeze in portions — 12 months',
    ],
    warnings: [
      'One bad apple will genuinely spoil the bunch — ethylene gas accelerates ripening/rot in neighbors',
      'Avoid storing apples near potatoes, leafy greens, or any sensitive produce',
    ],
    proTips: [
      'To prevent browning on cut apples: submerge in 1 cup water + ½ tsp salt solution for 10 min, rinse',
      'Cold storage slows cellular respiration — refrigerated apples last 6–8x longer than room temperature',
    ],
    shelfLife: { roomTemp: '5–7 days', fridge: '4–8 weeks', freezer: '8 months (sliced)' },
  },

  greekYogurt: {
    storage: [
      'Keep tightly sealed in the refrigerator',
      'Store upside down — creates a vacuum seal and keeps whey integrated longer',
      'Push plastic wrap directly onto the surface of opened containers',
    ],
    preservation: [
      'Freeze: texture changes (grainy) but fine for smoothies and baking — lasts 2 months',
    ],
    warnings: [
      'Never leave at room temperature more than 2 hours',
      'Pink/orange discoloration on the surface is mold — discard the entire container',
      'Separation (whey pooling) is normal — just stir it back in',
    ],
    proTips: [
      'Upside-down storage trick extends shelf life by 1–2 weeks past the use-by date',
      'Strain overnight through cheesecloth for ultra-thick labneh — use as a cream cheese substitute',
    ],
    shelfLife: { fridge: '2–3 weeks (unopened), 1 week (opened)', freezer: '2 months (texture changes)' },
  },

  cucumber: {
    storage: [
      'Store at room temperature for short-term (up to 3 days) — they\'re cold-sensitive',
      'For longer storage: wrap individually in paper towels, place in a bag, refrigerate at 50–55°F',
      'Do NOT store below 50°F — chilling injury causes pitting, wateriness, and decay',
    ],
    preservation: [
      'Quick pickles: slice, brine in vinegar + salt + sugar solution, refrigerate — lasts 2 months and improves with time',
    ],
    warnings: [
      'Bottom of the crisper is typically too cold for cucumbers — causes accelerated decay',
      'Keep away from tomatoes, melons, and bananas (ethylene sensitive)',
    ],
    proTips: [
      'Cucumber stored cut-side down on a plate stays crisper than wrapped in plastic',
      'English cucumbers wrapped in original plastic last longest — the wrap is engineered for it',
    ],
    shelfLife: { roomTemp: '3 days', fridge: '1 week (properly wrapped)', freezer: 'Only for pickles' },
  },

  mango: {
    storage: [
      'Unripe: store at room temperature until fully ripe',
      'Ripe: refrigerate immediately, extends life 5–7 days',
      'Cut: airtight container in fridge, use within 4 days',
    ],
    preservation: [
      'Peel, dice, freeze on a sheet pan, bag — lasts 6 months, perfect for smoothies',
      'Blend into mango puree and freeze in ice cube trays',
    ],
    ripening: [
      'Paper bag at room temperature with a banana — ripe in 1–2 days',
      'Ripen faster by placing in a container of uncooked rice (traditional Indian method)',
    ],
    proTips: [
      'Ripe mango: squeeze gently — should yield like a ripe peach. Color is not a reliable indicator (varies by variety)',
      'The hedgehog cut: score the flesh in a grid, push inside out — cleanest way to cube without a slicer',
    ],
    warnings: [
      'Mango skin contains urushiol (same compound as poison ivy) — wash hands after handling skin if sensitive',
    ],
    shelfLife: { roomTemp: '3–5 days (ripe)', fridge: '5–7 days (ripe)', freezer: '6 months (diced)' },
  },
};

export function getFoodHacks(foodName: string): FoodHack | null {
  const key = foodName.toLowerCase().replace(/\s+/g, '').replace(/-/g, '');

  // Direct match
  if (FOOD_HACKS[key]) return FOOD_HACKS[key];

  // Fuzzy match against known keys
  const aliases: Record<string, string> = {
    avo: 'avocado',
    'greek yogurt': 'greekYogurt',
    yogurt: 'greekYogurt',
    'sweet potato': 'sweetpotato',
    yam: 'sweetpotato',
    fish: 'salmon',
    'ground beef': 'beef',
    steak: 'beef',
    herb: 'cilantro',
    parsley: 'cilantro',
    basil: 'cilantro',
    strawberry: 'berries',
    blueberry: 'berries',
    raspberry: 'berries',
    lime: 'lemon',
    onions: 'onion',
    garlic: 'garlic',
    apple: 'apple',
    apples: 'apple',
    mango: 'mango',
  };

  for (const [alias, target] of Object.entries(aliases)) {
    if (key.includes(alias) || foodName.toLowerCase().includes(alias)) {
      return FOOD_HACKS[target] ?? null;
    }
  }

  return null;
}

export function getTopHack(foodName: string): string | null {
  const hacks = getFoodHacks(foodName);
  if (!hacks) return null;
  return hacks.warnings[0] ?? hacks.storage[0] ?? hacks.proTips[0] ?? null;
}
