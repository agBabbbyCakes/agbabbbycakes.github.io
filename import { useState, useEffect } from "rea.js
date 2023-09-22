import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

import { builder } from "../../hooks";
import {
  EcosystemItem,
  ProtocolItem,
  ProtocolDetail,
  BotDetail,
  BotCounts,
  NewDeploymentProps,
} from "../../types";
import "./styles.css";

type BotSelectItemProps = {
  bot: BotDetail;
  botCount: number;
  setBotCount: (value: number) => void;
};

const BotCardItem = ({ bot, botCount, setBotCount }: BotSelectItemProps) => {
  const incrementCount = () => {
    if (!bot.max_number || botCount < bot.max_number) setBotCount(botCount + 1);
  };

  const decrementCount = () => {
    if (botCount > 0) setBotCount(botCount - 1);
  };

  // TODO: use `bot.coming_soon` to display some sort of banner
  return (
    <div className="botCardItem">
      <div key={bot.id}>
        <div className="botCardItem-header">
          <h3>{bot.name}</h3>
        </div>
        <div className="botCardItem-body">
          <p className="botText-desc">{bot.description}</p>
        </div>
        <div className="botCardItem-footer">
          <button
            className="botCardMinus"
            disabled={bot.coming_soon}
            onClick={decrementCount}
          >
            -
          </button>

          <input
            className="botCardInput"
            type="number"
            value={botCount}
            disabled={bot.coming_soon}
            onChange={(e) => {
              const value = parseInt(e.target.value);
              if (value >= 0 && (!bot.max_number || value <= bot.max_number))
                setBotCount(value);
            }}
          />

          <button
            className="botCardPlus"
            disabled={
              bot.coming_soon ||
              (!!bot.max_number && bot.max_number == botCount)
            }
            onClick={incrementCount}
          >
            +
          </button>
        </div>
        <div className="botCardPrice-wrap">
          {bot.coming_soon
            ? "Coming soon!"
            : `Subtotal: ${bot.cost * botCount}.00 per day`}
        </div>
      </div>
    </div>
  );
};

type ProtocolButtonProps = {
  protocol: ProtocolItem;
  botCount: number;
  onClick: () => void;
};

const ProtocolButton = ({
  protocol,
  botCount,
  onClick,
}: ProtocolButtonProps) => {
  return (
    <button
      className="protoItem"
      disabled={protocol.coming_soon}
      onClick={onClick}
    >
      {protocol.name}
      <br />
      {protocol.coming_soon
        ? "(Coming soon)"
        : `${botCount} Bot${botCount != 1 ? "s" : ""}`}
    </button>
  );
};

type ProtocolSelectStepProps = {
  ecosystem: EcosystemItem;
  prevLink: string;
  nextLink: string;
  getFn: (key: keyof NewDeploymentProps) => any;
  updateFn: (key: keyof NewDeploymentProps, value: any) => void;
};

const ProtocolSelectStep = ({
  ecosystem,
  prevLink,
  nextLink,
  getFn,
  updateFn,
}: ProtocolSelectStepProps) => {
  const [protocols, setProtocols] = useState<ProtocolItem[]>([]);
  const [selectedProtocol, setSelectedProtocol] =
    useState<ProtocolDetail | null>(null);

  useEffect(() => {
    builder
      .getEcosystemById(ecosystem.id)
      .then((ecosystem) => setProtocols(ecosystem.protocols || []))
      .catch(console.error);
  }, [ecosystem]);

  const handleButtonClick = (protocol: ProtocolItem) => {
    builder
      .getProtocolById(protocol.id)
      .then(setSelectedProtocol)
      .catch(console.error);
  };

  // NOTE: Temporary state used for this form, updated in `handleNextClick`
  const [botCounts, setBotCounts] = useState<BotCounts>(getFn("bot_counts"));

  const handleNextClick = () => {
    updateFn("bot_counts", botCounts);
  };

  const handleBotCountChange = (botId: number, count: number) => {
    const bots = getFn("bots") || [];
    const addBot = bots.find((bot: BotDetail) => bot.id == botId);
    if (selectedProtocol && !addBot) {
      updateFn("bots", [
        ...bots,
        selectedProtocol.bots.find((bot) => bot.id == botId),
      ]);
    } else if (count == 0) {
      updateFn(
        "bots",
        bots.filter((bot: BotDetail) => bot.id != botId),
      );
    }

    setBotCounts((prevState: BotCounts) => {
      if (count == 0) {
        delete prevState[botId];
        return { ...prevState };
      }

      return { ...prevState, [botId]: count };
    });
  };

  const handleBotBack = () => {
    setSelectedProtocol(null);
  };

  return (
    <div className="card">
      <div className="header-box">
        <h2 className="header-label">
          {!selectedProtocol ? "Protocol Choices" : "Bot Selection"}
        </h2>
        <p className="header-text">
          {!selectedProtocol
            ? "Add activity to the following protocols using chaosbots. " +
              "These protocols existed at the time you selected previously, " +
              "and we used historical transactions from this period to train " +
              "our bots so they could mimic the activity so you can feel like you're living it again"
            : "Each bot below represents a unique class of behavior we've trained " +
              "on the protocol you selected previously. Add as many (or as few) " +
              "bots as you choose to see if introducing more or less of a behavior " +
              "creates the kind of chaos you seek. Some bots can only have a limited " +
              "number for stability."}
        </p>
      </div>

      <div className="cardOuterWrap">
        {selectedProtocol === null ? (
          <div className="protocolChoiceWrap">
            {protocols.map((protocol) => (
              <ProtocolButton
                key={protocol.id}
                protocol={protocol}
                botCount={protocol.bots.reduce(
                  (sum, botId) => sum + (botCounts[botId] || 0),
                  0,
                )}
                onClick={() => handleButtonClick(protocol)}
              />
            ))}
          </div>
        ) : (
          <div className="botCardWrap">
            {selectedProtocol.bots.map((bot) => (
              <BotCardItem
                bot={bot}
                botCount={botCounts[bot.id] || 0}
                setBotCount={(v) => handleBotCountChange(bot.id, v)}
              />
            ))}
          </div>
        )}
      </div>
      <div className="footer">
        {!selectedProtocol && (
          <Link to={prevLink} className="previousButton">
            Previous
          </Link>
        )}

        {selectedProtocol ? (
          <button className="newNextButton" onClick={handleBotBack}>
            Back
          </button>
        ) : (
          <Link
            to={nextLink}
            className="newNextButton"
            onClick={handleNextClick}
          >
            Review
          </Link>
        )}
      </div>
    </div>
  );
};

export default ProtocolSelectStep;
